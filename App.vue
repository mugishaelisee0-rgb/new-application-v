<template>
  <div class="dashboard-container">
    <div class="tabs">
      <button 
        @click="currentTab = 'applicant'" 
        :class="{ active: currentTab === 'applicant' }">
        Applicant Form
      </button>
      <button 
        @click="currentTab = 'admin'" 
        :class="{ active: currentTab === 'admin' }">
        Admin Dashboard ({{ applications.length }})
      </button>
    </div>

    <div v-if="successMessage" class="alert success">
      Application submitted successfully!
    </div>

    <div v-if="currentTab === 'applicant'" class="form-container">
      <h2>Job Application Form</h2>
      <form @submit.prevent="submitApplication">
        <div class="row">
          <div class="placeholder-shown">
          <div class="field">
            <label>Firstname</label>
            <input type="text" v-model="form.firstname" placeholder="enter your first name" required />
          </div></div>
          <div class="placeholder-shown">
          <div class="field">
            <label> last name</label>
            <input type="text" v-model="form.surname" placeholder="enter  last name" required />
          
        </div></div>
        </div>

        <div class="field">
          <label>Date of Birth (DOB)</label>
          <input type="date" v-model="form.dob" required />
        </div>
<div class="placeholder-shown">
        <div class="field">
          <label>Address</label>
      
            <textarea v-model="form.address" placeholder="enter your address" required rows="3"></textarea>
        </div>
        </div>
<div class="placeholder-shown">
  <div class="field">
  <label>Phone Number</label>
  <input type="tel" v-model="form.phone" required placeholder="enter phone number" />
  </div>
</div>

        <div class="field">
          <label>Gender</label>
          <div class="radio-group">
            <label><input type="radio" v-model="form.gender" value="Male" required /> Male</label>
            <label><input type="radio" v-model="form.gender" value="Female" /> Female</label>
            <label><input type="radio" v-model="form.gender" value="Other" /> Other</label>
          </div>
        </div>
<div class="placeholder-shown">
  <div class="field">
  <label>National ID</label>
  <input type="text" v-model="form.nationalId" required placeholder="enter national ID" />
  </div>
</div>
        

        <button type="submit" class="btn-submit">Submit Application</button>
      </form>
    </div>

    <div v-if="currentTab === 'admin'" class="admin-container">
      <h2>Submitted Applications</h2>
      
      <div v-if="applications.length === 0" class="empty-state">
        No applications have been submitted yet.
      </div>

      <table v-else class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>National ID</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(app, index) in applications" :key="index">
            <td>{{ app.firstname }} {{ app.surname }}</td>
            <td>{{ app.dob }}</td>
            <td>{{ app.phone }}</td>
            <td>{{ app.gender }}</td>
            <td>{{ app.nationalId }}</td>
            <td class="address-cell">{{ app.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'


const currentTab = ref('applicant')


const form = ref({
  firstname: '',
  surname: '',
  dob: '',
  address: '',
  phone: '',
  gender: '',
  nationalId: ''
})


const applications = ref([])
const successMessage = ref(false)


const submitApplication = () => {
  applications.value.push({ ...form.value })
  successMessage.value = true

  form.value = {
    firstname: '',
    surname: '',
    dob: '',
    address: '',
    phone: '',
    gender: '',
    nationalId: ''
  }

  setTimeout(() => {
    successMessage.value = false
  }, 3000)
}
</script>

<style scoped>
.dashboard-container {
  max-w: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  color: #333;
}
.tabs {
  display: flex;
  border-b: 2px solid #eee;
  margin-bottom: 2rem;
  gap: 1rem;
}
.tabs button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: #666;
}
.tabs button.active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
}
.form-container, .admin-container {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  gap: 1rem;
}
.field {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
}
label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}
input[type="text"], input[type="date"], input[type="tel"], textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.radio-group {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem 0;
  background-color: #1373331a;
  text-align: center;
}
.btn-submit {
  background: #42b883;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-submit:hover {
  background: #35495e;
  color: #137333;
  border-radius: 20px;
}
.alert {
  padding: 1rem;
  background: #e6f4ea;
  color: #137333;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  color: #137333;
}
.empty-state {
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border: 2px dashed #ccc;
  border-radius: 6px;
  color: #666;
}
.admin-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.admin-table th, .admin-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.admin-table th {
  background: #f5f5f5;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: #555;
}
.address-cell {
  max-w: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.placeholder-shown{
  color: #0f2394;
  text-transform: capitalize;
  text-align: center;

}
h2{
  color: #137333;
  text-align: center;
}
</style>