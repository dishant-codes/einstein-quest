// API Client Test - Run this in browser console or as a test

import { apiClient, isDemoMode } from './api-client';

export async function testApiClient() {
  console.log('🧪 Testing API Client...');
  console.log('Demo Mode:', isDemoMode());

  try {
    // Test Health Check
    console.log('\n📋 Testing Health Check...');
    const health = await apiClient.healthCheck();
    console.log('✅ Health Check:', health);
  } catch (error) {
    console.log('❌ Health Check Failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    // Test School Registration
    console.log('\n🏫 Testing School Registration...');
    const schoolData = {
      schoolName: 'Test School',
      udiseCode: '12345678901',
      schoolAddress: 'Test Address',
      principalName: 'Test Principal',
      principalContact: '9876543210',
      principalEmail: 'principal@test.com'
    };
    
    const schoolResult = await apiClient.registerSchool(schoolData);
    console.log('✅ School Registration:', schoolResult);
  } catch (error) {
    console.log('❌ School Registration Failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    // Test Get Schools
    console.log('\n📋 Testing Get Schools...');
    const schools = await apiClient.getSchools({ page: 1, limit: 10 });
    console.log('✅ Get Schools:', schools);
  } catch (error) {
    console.log('❌ Get Schools Failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    // Test Mentor Registration
    console.log('\n👨‍🏫 Testing Mentor Registration...');
    const mentorData = {
      mentorName: 'Test Mentor',
      schoolCode: 'SCH001',
      contactNumber: '9876543210',
      email: 'mentor@test.com',
      qualification: 'B.Sc Physics'
    };
    
    const mentorResult = await apiClient.registerMentor(mentorData);
    console.log('✅ Mentor Registration:', mentorResult);
  } catch (error) {
    console.log('❌ Mentor Registration Failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    // Test Candidate Registration
    console.log('\n🎓 Testing Candidate Registration...');
    const candidateData = {
      studentName: 'Test Student',
      fatherName: 'Test Father',
      motherName: 'Test Mother',
      dateOfBirth: '2010-01-01',
      gender: 'Male',
      category: 'General',
      contactNumber: '9876543210',
      email: 'student@test.com',
      mentorCode: 'MEN001',
      kbeCategory: 'KBE-I'
    };
    
    const candidateResult = await apiClient.registerCandidate(candidateData);
    console.log('✅ Candidate Registration:', candidateResult);
  } catch (error) {
    console.log('❌ Candidate Registration Failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  try {
    // Test Exam Statistics
    console.log('\n📊 Testing Exam Statistics...');
    const stats = await apiClient.getStatistics();
    console.log('✅ Exam Statistics:', stats);
  } catch (error) {
    console.log('❌ Exam Statistics Failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  console.log('\n🎉 API Client Test Complete!');
}

// Auto-run test in development
if (import.meta.env.DEV) {
  console.log('API Client is ready for testing. Run testApiClient() to test all endpoints.');
}
