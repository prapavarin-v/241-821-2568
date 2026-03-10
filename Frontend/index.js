//function submitData() {
//add new
//userdata checked ว่ามีค่ามั้ย!
const validateData = (userData) =>{
    let errors = [];//ตัวแปรรับค่า arr
    if (!userData.firstname) { //firstnameต้องตรงกับค่าที่รับมา!!
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจอย่างน้อย 1 อย่าง');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบายเกี่ยวกับตัวคุณ');
    }
    return errors;
}

const submitData = async() => {
    let firstNameDOM = document.querySelector('input[name=firstname]');//ตรงกันกับข้างบน
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked')|| {};
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let massageDOM = document.getElementById('message')
    try {
        let interest = '';
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value;
            if (i != interestDOMs.length - 1) {
                interest += ',';
        }
    }

    let userData = {
            firstname: firstNameDOM.value,//ตรงกันกับข้างบน
            lastname: lastNameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest
        }

        //add 
         const errors = validateData(userData);
         //ถ้ามี error จะโยนลงไปที่ catch ทันที
           if (errors.length > 0) {
              throw {
                  message: 'กรุณากรอกข้อมูลไม่ครบถ้วน',
                  errors: errors
              }
          }
    
        const response = await axios.post('http://localhost:8000/users', userData)
        console.log('response', response.data);
        massageDOM.innerText = 'บันทึกข้อมูลสำเร็จ'
        massageDOM.className = 'message success'
    } catch (error){
        console.log('error message', error.message);
        console.log('error', error.errors);
        if (error.response){
            console.log('Error response:', error.response);
            error.massage = error.response.data.massage;
            error.errors = error.response.data.errors;
        }


        //add
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</ul>'
        htmlData += '</div>'
        massageDOM.innerHTML = htmlData
        massageDOM.className = 'message danger'
    }

    
}