/**
 * PostgreSQL Database Connection Configuration
 * Just Go Green Application
 */

import { Pool, PoolConfig } from 'pg';

// Database configuration interface
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max?: number;
  min?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
  ssl?: boolean | { rejectUnauthorized: boolean };
}

// Load configuration from environment variables
export const dbConfig: DatabaseConfig = {
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] || '5432'),
  database: process.env['DB_NAME'] || 'justgogreen',
  user: process.env['DB_USER'] || 'justgogreen_user',
  password: process.env['DB_PASSWORD'] || '',
  max: parseInt(process.env['DB_POOL_MAX'] || '10'),
  min: parseInt(process.env['DB_POOL_MIN'] || '2'),
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: process.env['NODE_ENV'] === 'production' ? { rejectUnauthorized: false } : false
};

// Create connection pool
export const pool = new Pool(dbConfig as PoolConfig);

// Pool error handling
pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test connection
export async function testConnection(): Promise<boolean> {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('✅ Database connected successfully at:', result.rows[0].now);
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Query helper with error handling
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Graceful shutdown
export async function closePool(): Promise<void> {
  await pool.end();
  console.log('Database pool closed');
}

// Example usage functions

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

/**
 * Create new user
 */
export async function createUser(userData: {
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  role: string;
}) {
  const result = await query(
    `INSERT INTO users (email, password_hash, first_name, last_name, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userData.email, userData.password_hash, userData.first_name, userData.last_name, userData.role]
  );
  return result.rows[0];
}

/**
 * Update user XP and level
 */
export async function updateUserXP(userId: string, xpAmount: number, reason: string) {
  return await transaction(async (client) => {
    // Update user XP
    await client.query(
      'UPDATE users SET xp = xp + $1 WHERE id = $2',
      [xpAmount, userId]
    );

    // Record transaction
    await client.query(
      `INSERT INTO xp_transactions (user_id, amount, reason)
       VALUES ($1, $2, $3)`,
      [userId, xpAmount, reason]
    );

    // Get updated user
    const result = await client.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0];
  });
}

/**
 * Get user stats
 */
export async function getUserStats(userId: string) {
  const result = await query(
    'SELECT * FROM user_stats WHERE id = $1',
    [userId]
  );
  return result.rows[0];
}

/**
 * Get communities with pagination
 */
export async function getCommunities(limit: number = 10, offset: number = 0) {
  const result = await query(
    `SELECT c.*, cs.member_count, cs.post_count, cs.event_count
     FROM communities c
     LEFT JOIN community_stats cs ON c.id = cs.id
     WHERE c.is_active = true
     ORDER BY c.created_at DESC
     LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
}

/**
 * Get training modules by mentor
 */
export async function getModulesByMentor(mentorId: string) {
  const result = await query(
    `SELECT m.*, 
            array_agg(DISTINCT t.topic) as topics,
            COUNT(DISTINCT e.user_id) as enrolled_count
     FROM training_modules m
     LEFT JOIN training_topics t ON m.id = t.module_id
     LEFT JOIN module_enrollments e ON m.id = e.module_id
     WHERE m.mentor_id = $1
     GROUP BY m.id
     ORDER BY m.created_at DESC`,
    [mentorId]
  );
  return result.rows;
}

/**
 * Get donation projects with funding status
 */
export async function getDonationProjects() {
  const result = await query(
    `SELECT * FROM project_funding_stats
     WHERE status = 'active'
     ORDER BY funding_percentage DESC`
  );
  return result.rows;
}

/**
 * Create donation
 */
export async function createDonation(donationData: {
  project_id: string;
  donor_id: string;
  amount: number;
  payment_method: string;
}) {
  return await transaction(async (client) => {
    // Create donation
    const donationResult = await client.query(
      `INSERT INTO donations (project_id, donor_id, donor_name, amount, payment_method, status)
       SELECT $1, $2, CONCAT(u.first_name, ' ', u.last_name), $3, $4, 'completed'
       FROM users u WHERE u.id = $2
       RETURNING *`,
      [donationData.project_id, donationData.donor_id, donationData.amount, donationData.payment_method]
    );

    // Update project current amount
    await client.query(
      `UPDATE donation_projects 
       SET current_amount = current_amount + $1,
           donor_count = donor_count + 1
       WHERE id = $2`,
      [donationData.amount, donationData.project_id]
    );

    // Award Green Points
    const pointsAmount = Math.floor(donationData.amount / 100); // 1 point per $100
    await client.query(
      `UPDATE users SET green_points = green_points + $1 WHERE id = $2`,
      [pointsAmount, donationData.donor_id]
    );

    await client.query(
      `INSERT INTO green_points_transactions (user_id, amount, transaction_type, reason, reference_type, reference_id)
       VALUES ($1, $2, 'earned', 'Donation reward', 'donation', $3)`,
      [donationData.donor_id, pointsAmount, donationResult.rows[0].id]
    );

    return donationResult.rows[0];
  });
}

/**
 * Enroll user in training module
 */
export async function enrollInModule(userId: string, moduleId: string) {
  const result = await query(
    `INSERT INTO module_enrollments (module_id, user_id, progress, status)
     VALUES ($1, $2, 0, 'in-progress')
     ON CONFLICT (module_id, user_id) DO NOTHING
     RETURNING *`,
    [moduleId, userId]
  );
  
  if (result.rows.length > 0) {
    // Update enrolled count
    await query(
      'UPDATE training_modules SET enrolled_count = enrolled_count + 1 WHERE id = $1',
      [moduleId]
    );
  }
  
  return result.rows[0];
}

/**
 * Create notification
 */
export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: string
) {
  const result = await query(
    `INSERT INTO notifications (user_id, title, message, type)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, title, message, type]
  );
  return result.rows[0];
}

// Export pool and helpers
export default {
  pool,
  query,
  transaction,
  testConnection,
  closePool,
  // User functions
  getUserByEmail,
  createUser,
  updateUserXP,
  getUserStats,
  // Community functions
  getCommunities,
  // Training functions
  getModulesByMentor,
  enrollInModule,
  // Donation functions
  getDonationProjects,
  createDonation,
  // Notification functions
  createNotification
};
