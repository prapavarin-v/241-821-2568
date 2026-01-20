//console.log("Hello World");
/*let fname = "John";
console.log("Name:", fname);
const PI = 3.14; //*const ห้ามเปลี่ยนค่า!!!

let age = 30;
let height = 5.9;

fname="Alice";
console.log("Hello " + fname);

fname="Bob";
PI=3.14159;//*const
console.log("Name: ",fname);
console.log("Age: " ,age);
console.log("Height: ", height);*/

/*let number1='10';
let number2='3';
let result=number1+number2;
console.log("ผลบวก:", result);//103เป็นstr

let number1=10;
let number2=20;
let condition=number1<number2; 
console.log("condition:", condition);// true*/

//ต้องเป็นจริงถึงเข้า condition

/*let number1=3;
let number2=5;
if(number1>=number2){//เช็คหลายเงื่อนไข AND &&
    console.log('this is if');//output
}else if(number1==number2){//หลัง else if ต้องมีเงื่อนไข!
    console.log('this is else if');
}else{
    console.log('this is else');
}*/

//คำนวน Grade ระวัง sytax!!!!
/*let score=prompt("Enter your score:");
 if(score>=80){
    console.log('Grade A');
 }else if(score>=70){
    console.log('Grade B');
 }else if(score>=60){
    console.log('Grade C');
 }else if(score>=50){
    console.log('Grade D');
 }else{
    console.log('Grade F');
 } */

/*let number1=5
let number2=10

let condition1=(number1>0) || (number2>0)// T or T
console.log("condition1:", condition1)//true

let age=25
let gender="female"
if(age >= 18 && gender=="female"){// must T & T
    console.log("You are eligible to vote.");
}*/

/*let number1=20

if(number1 %2 == 0){
    console.log("Even number");
}*/

//Loop
/*let conter=0;
while(conter<=4){//ทำ5รอบ
    conter+=1;
    console.log("while:", conter);//1-5
}

for(let i=0; i<=4; i++){//ทำ5รอบ
    console.log("for:", i);//0-4
}*/

//Array
/*let age1=25;
let age2=30;
let age3=35;
console.log(age1, age2, age3);// 25 30 35

let age =[25,30,35];
console.log(age);//[25,30,35]
console.log(age[1]);//30

age=[40,45,50];
console.log(age);//[40,45,50]

//ต่อ array
age.push(55);
console.log(age);//[40,45,50,55]

//ความยาวของ array
console.log(age.length);//4

//ลบสมาชิกตัวสุดท้าย
age.pop();
console.log(age);//[40,45,50]

if(age.includes(45)){//มีค่า 45 อยู่มั้ย??
    console.log("45 is found.");
}

let number=[90,60,80,40,50];
number.sort();//เรียง min-max
console.log(number);//[40,50,60,80,90]

let names=["John","Alice","Bob"];
names.push("Smith");//ต่อ array
names.sort();
console.log(names);
console.log("Length:", names.length);

for(let i=0; i<names.length; i++){
    console.log(names[i]);
}*/

//object
/*let student=[{
    age:20,
    name:"Emma",
    grade:'A'
},{
    age:22,
    name:"Liam",
    grade:'B'
}];
for(let i=0; i<student.length; i++){
    console.log("student",+(i+1)+":");
    console.log("Name:", student[i].name);
    console.log("Age:", student[i].age);
    console.log("Grade:", student[i].grade);
}
student.push({//ต่อ
    age:21,
    name:"Olivia",
    grade:'A'
});
console.log(student);*/

//function
//ประกาศฟังก์ชัน
/*function calculate_grade(score){
    if(score>=80){
        grade='A';
    }else if(score>=70){
        grade='B';
    }else if(score>=60){
        grade='C';
    }else if(score>=50){
        grade='D';
    }else{
        grade='F';
    }   
    return grade;
}   
//เรียกใช้ฟังก์ชัน
let student_score=85;
let student_grade=calculate_grade(student_score);
console.log("Student grade:", student_grade);//grade A*/

//array
let score=[10,20,30,40,50];
for(let i=0; i<score.length; i++){
    //console.log('Score at index +'+i+':', score[i]); (1)
    console.log(`Score at index ${i}: ${score[i]}`);// (2)
    //&{varible}-->Backtick (`) $=เหมือนตัวแปรปกติ
}

//score[0]=score[0]*2 วิธี1
score=score.map(s => {//map=แปลงค่าทุกตัว
    return s*2
}); 

score.forEach((s) => {//ใช้วนลูป array ไม่คืนค่า array ใหม่
    console.log('score', s);
})

/*let score=[10,20,30,40,50];

for (let index=0; index<score.length; index++){
    console.log('score',score[index]);
}
let newScore=score.filter((s)=>{//คัดเลือกสมาชิกใน array
    return s>=30;//30 up
});

newScore.forEach((ns)=>{//[30,40,50]
    console.log('new score:',ns);
});*/


//object+function
/*let students=[//มี s !!test
    { name:'aa',score:'50',grade:'A'},
    { name:'bb',score:'60',grade:'B'}
];
console.log('Student:',students[0]);//มี s !!test

let student=students.find((s)=>{
    if (s.name==='bb'){
        return true
    }
})
let doubleScore_student=students.map((s)=>{//map เปลี่ยนค่าทุกตัว
    s.score=s.score*2
    return s
})
console.log('student:',student)
console.log(doubleScore_student)

let highScore_student=students.filter((s)=>{
    if (s.score>=110){
        return true
    }
})
console.log('high score student:',highScore_student);*/
