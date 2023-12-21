import { Component,ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent {

  submitted = false;
  empForm!: FormGroup;
  page1:boolean = true;
  page2:boolean = false;   

  constructor(private _fb:FormBuilder, private cd: ChangeDetectorRef){}

  ngOnInit(){
    this.empForm = this._fb.group({
      title: '',
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      country:'',
      zipCode: '',
      uploadPhoto: '',
      workExperience: '',      
      fromPeriod: '',
      toPeriod: '',
      shortDescription:'',
      companyName:'',
      dynamicInputs: this._fb.array([]) 
    });
  }

  /*=============== Remove Dynamic Input ================*/
  removeInput(index:any){
    (this.empForm.get('dynamicInputs') as FormArray).removeAt(index)
  }

 /*=============== Get Dynamic Input ================*/
 get dynamicInputs() {
  return this.empForm.get('dynamicInputs') as FormArray
}

 /*=============== Add Dynamic Input ================*/
addInput() {
  this.dynamicInputs.push(this._fb.control(''))
}

/* ============ Submit Registration Form ================*/
  onFormSubmit(){
    this.submitted = true;
    // if(!this.empForm.valid) {
    //   alert('Please fill all the required fields to create a super hero!')
    //   return false;
    // } else {
    //   console.log(this.empForm.value)
    // }
    // this.empForm.reset(); 

    if(this.empForm.valid && this.empForm.value != ""){  
      console.log(this.empForm.value);      
      localStorage.setItem("EmpInfo", JSON.stringify(this.empForm.value));      
    }
    else{
      alert("Input fields are blank!");      
    }
    this.empForm.reset(); 
       
  }

  /* ============ Go next Page ================*/
  goNext(){    
    this.page1 = false;
    this.page2 = true;
  } 
  
  goBack(){
    this.page1 = true;
    this.page2 = false;
  } 

  /*============ File Upload ============*/
  @ViewChild('fileInput') el: ElementRef | undefined;
  // imageUrl: any = '../../assets/images/man-iron-man.jpg';
  imageUrl: any = '../../assets/images/avatar.svg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.empForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

/* ============ remove uploaded file ============*/
  removeUploadedFile() {
    let newFileList = Array.from(this.el?.nativeElement.files);
    // this.imageUrl = '../../assets/images/man-iron-man.jpg';
    this.imageUrl = '../../assets/images/avatar.svg';
    this.editFile = true;
    this.removeUpload = false;
    this.empForm.patchValue({
      file: [null]
    });
  }  


}
