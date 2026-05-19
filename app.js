const { createApp, ref } = Vue;

createApp({
    setup() {
     
        const currentTab = ref('applicant'); 

     
        const form = ref({
            firstname: '',
            surname: '',
            dob: '',
            address: '',
            phone: '',
            gender: '',
            nationalId: ''
        });

        const applications = ref([]);
        const successMessage = ref(false);

       
        const submitApplication = () => {
          
            applications.value.push({ ...form.value });

            
            successMessage.value = true;

          
            form.value = {
                firstname: '',
                surname: '',
                dob: '',
                address: '',
                phone: '',
                gender: '',
                nationalId: ''
            };

         
            setTimeout(() => {
                successMessage.value = false;
            }, 3000);
        };

        return {
            currentTab,
            form,
            applications,
            successMessage,
            submitApplication
        };
    }
}).mount('#app');