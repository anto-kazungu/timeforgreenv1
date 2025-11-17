/**
 * Test PostgreSQL Database Connection
 * Run: ts-node test-connection.ts
 */

import { testConnection, query, getUserByEmail, getCommunities } from './connection-config';

async function runTests() {
  console.log('🔍 Testing PostgreSQL Connection...\n');

  // Test 1: Basic Connection
  console.log('Test 1: Basic Connection');
  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Connection test failed');
    process.exit(1);
  }
  console.log('');

  // Test 2: Query Test
  console.log('Test 2: Simple Query');
  try {
    const result = await query('SELECT COUNT(*) as count FROM users');
    console.log(`✅ Found ${result.rows[0].count} users in database`);
  } catch (error) {
    console.error('❌ Query test failed:', error);
  }
  console.log('');

  // Test 3: Get User
  console.log('Test 3: Get User by Email');
  try {
    const user = await getUserByEmail('member@justgogreen.com');
    if (user) {
      console.log(`✅ Found user: ${user.first_name} ${user.last_name} (${user.role})`);
      console.log(`   XP: ${user.xp}, Green Points: ${user.green_points}, Level: ${user.level}`);
    } else {
      console.log('⚠️  User not found (run seed-data.sql first)');
    }
  } catch (error) {
    console.error('❌ Get user test failed:', error);
  }
  console.log('');

  // Test 4: Get Communities
  console.log('Test 4: Get Communities');
  try {
    const communities = await getCommunities(5, 0);
    console.log(`✅ Found ${communities.length} communities`);
    communities.forEach((c: any) => {
      console.log(`   - ${c.name} (${c.member_count} members)`);
    });
  } catch (error) {
    console.error('❌ Get communities test failed:', error);
  }
  console.log('');

  // Test 5: Check Tables
  console.log('Test 5: Check Database Tables');
  try {
    const result = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    console.log(`✅ Found ${result.rows.length} tables:`);
    result.rows.forEach((row: any) => {
      console.log(`   - ${row.table_name}`);
    });
  } catch (error) {
    console.error('❌ Check tables test failed:', error);
  }
  console.log('');

  // Test 6: Check Views
  console.log('Test 6: Check Database Views');
  try {
    const result = await query(`
      SELECT table_name 
      FROM information_schema.views 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log(`✅ Found ${result.rows.length} views:`);
    result.rows.forEach((row: any) => {
      console.log(`   - ${row.table_name}`);
    });
  } catch (error) {
    console.error('❌ Check views test failed:', error);
  }
  console.log('');

  // Test 7: Database Size
  console.log('Test 7: Database Size');
  try {
    const result = await query(`
      SELECT pg_size_pretty(pg_database_size('justgogreen')) as size
    `);
    console.log(`✅ Database size: ${result.rows[0].size}`);
  } catch (error) {
    console.error('❌ Database size test failed:', error);
  }
  console.log('');

  // Summary
  console.log('═══════════════════════════════════════');
  console.log('✅ All tests completed!');
  console.log('═══════════════════════════════════════');
  console.log('');
  console.log('Next steps:');
  console.log('1. If tables are empty, run: npm run seed');
  console.log('2. Update Angular services to use HTTP');
  console.log('3. Create backend API endpoints');
  console.log('4. Test full application flow');
  console.log('');

  process.exit(0);
}

// Run tests
runTests().catch((error) => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});
