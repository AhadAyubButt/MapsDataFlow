import { Modal } from "bootstrap";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";
import { IEmailData, IStore } from "../../interfaces/i-store";
import { FormArray, FormControl } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API, DataStore } from 'aws-amplify';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-store',
  templateUrl: './list-store.component.html',
  styleUrls: ['./list-store.component.css']
})
export class ListStoreComponent implements OnInit {
  listStore : IStore[] = [];
  listEmail:any =  [];
  form: FormGroup;
  storeInfo!: IStore;
  loader = false;
  create: boolean = false;
  update: boolean = false;
  flagInfo: any = [];
  StoreNum = '';
  loadingscreen: boolean = true;
  flagval:any = []
  // editMode?: boolean;

  get emailData (): any {
    return this.form.get(["emailData"])
  }
    

  constructor(private router: Router, private fb: FormBuilder,private http: HttpClient) { 
    this.form = this.fb.group({
      StoreNum: [''],
      emailData: this.fb.array([
        this.fb.group({
          Email: ['']
        })
      ])
    });
    this.StoreNum = "";
  }

  addEmailItem() {
    const email = this.form.controls["emailData"] as FormArray;
    email.push(this.fb.group({
      Email: ['']
    }))
  }

  delEmailItem(i:any) {
    const email = this.form.controls["emailData"] as FormArray;
    email.removeAt(i)
    console.log(i)
  }

  
  ngOnInit(): void {
    // @ts-ignore
    API.get('MapsDataFlowCRUD', '/items/listStore').then((value) =>{
      (value.Items as IStore[]).forEach((v) => {
        this.listStore.push(v)
      })
      let array = this.emailData
        value.Items[0].emailData.forEach((v2:any) => {
          this.listEmail.push(v2.Email)
        })
        this.loadingscreen = false;
    });
  }
  
  createMode(){
   this.emailData.clear();
   let modal = Modal.getInstance(document.getElementById("#staticexampleModal")!);
   this.create = true;
   const email = this.form.controls["emailData"] as FormArray;
    email.push(this.fb.group({
      Email: ['']
    }))
  }

  createModal(StoreNum: string){
    this.emailData.clear();
    let modal = Modal.getInstance(document.getElementById("#staticexampleModal")!);
    this.update = true;
    console.log(StoreNum)
    const getStore = async () => {
      // @ts-ignore
      const data = API.get('MapsDataFlowCRUD', '/items/' + StoreNum);
      data.then((val) => {
        this.storeInfo = val.Items[0];
        console.log(this.storeInfo)
        this.form.controls['StoreNum'].setValue(val.Items[0].StoreNum)
        this.storeInfo.emailData.forEach((v) => {
          const email = this.form.controls["emailData"] as FormArray;
          email.push(this.fb.group({
            Email: ['']
          }))
        })
        this.emailData.setValue(this.storeInfo.emailData)
      })
    }
    getStore().then();
   }

  closeModal(){
    this.form.controls['StoreNum'].setValue("")
    this.update = false;
    this.create = false;
    this.StoreNum = "";
  }

  submitStore(){
    let modal = Modal.getInstance(document.getElementById("staticexampleModal")!);
    const createStore = async () => {
       // @ts-ignore
      const data = API.post('MapsDataFlowCRUD', '/items/createStore', {
        body: {
          ...this.form.getRawValue()
        }
      });
      data.then((val) => {
        if (val.message == 'item created'){
          modal?.hide()
          this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
            this.router.navigate(["home", "liststores"]);
          });
        }
      })
    };
    createStore()
  }

  updateStore(){
    let modal = Modal.getInstance(document.getElementById("staticexampleModal")!);
    const data = API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: this.storeInfo.StoreNum,
        SK: 'profile',
        Status: this.storeInfo.Status,
        DMetricsFlag: this.storeInfo.DMetricsFlag,
        WMetricsFlag: this.storeInfo.WMetricsFlag,
        PMetricsFlag: this.storeInfo.PMetricsFlag,
        ...this.form.getRawValue()
      }
    })
    data.then((val)=>{
      if(val.message == 'item updated'){
        modal?.hide()
        this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
          this.router.navigate(["home", "liststores"]);
        });
      }
    })
  }

  makeActive(store: any){
    const data = API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: store.StoreNum,
        SK: 'profile',
        emailData: store.emailData,
        Status: 'Active',
        DMetricsFlag: store.DMetricsFlag,
        WMetricsFlag: store.WMetricsFlag,
        PMetricsFlag: store.PMetricsFlag
      }
    });
    data.then((val)=>{
      if(val.message == 'item updated'){
        this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
          this.router.navigate(["home", "liststores"]);
        });
      }
    })
  }

  makeInactive(store: any){
     //show loader
     this.loader = true;
     //web api call
     this.http.get('https://www.testjsonapi.com/users/').subscribe(data => {
      //  this.data = data;
      //  hide loader;
       this.loader = false;
     });
    const data = API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: store.StoreNum,
        SK: 'profile',
        emailData: store.emailData,
        Status: 'Inactive',
        DMetricsFlag: store.DMetricsFlag,
        WMetricsFlag: store.WMetricsFlag,
        PMetricsFlag: store.PMetricsFlag
      }
    });
    data.then((val)=>{
      if(val.message == 'item updated'){
        this.router.navigateByUrl("/home", { skipLocationChange: true }).then(() => {
          this.router.navigate(["home", "liststores"]);
        });
      }
    })
  }

  flagModal(StoreNum:any) {
    // let modal = Modal.getInstance(document.getElementById("#staticexampleModal1")!);
    this.flagInfo = [];
    this.flagval = [];
    const getStore = async () => {
      // @ts-ignore
      const data = API.get('MapsDataFlowCRUD', '/items/' + StoreNum);
      data.then((val) => {
        this.flagInfo = val.Items[0]
        this.StoreNum = StoreNum;
        // console.log(this.flagInfo);
        this.flagInfo.DMetricsFlag.forEach((v:any) => {
          if(v.Value == "Enable"){
            this.flagval.push(v)
          }
        })
        // console.log(this.flagval)
        // if(this.flagval.length == 20)[
        //   Swal.fire('Maximum Limit Exceeded', 'You have reached your maximum limit of 20 metrics to select.', 'info')
        // ]
      })
    }
    getStore().then();
  }

  enableDFlag(FlagInfo: any, metrics: any) {
    this.flagval.push(metrics);
    if(this.flagval.length >= 20)[
      Swal.fire('Maximum Limit Exceeded', 'You have reached your maximum limit of 20 metrics to select.', 'info')
    ]
    metrics.Value = "Enable"
    console.log(FlagInfo)
    API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: FlagInfo.StoreNum,
        SK: 'profile',
        Status: FlagInfo.Status,
        emailData: FlagInfo.emailData,
        DMetricsFlag: FlagInfo.DMetricsFlag,
        WMetricsFlag: FlagInfo.WMetricsFlag,
        PMetricsFlag: FlagInfo.PMetricsFlag,
      }
    }).then((v) => {
      console.log(v)
    })
  }

  disableDFlag(FlagInfo: any, metrics: any) {
    this.flagval.pop()
    metrics.Value = "Disable"
    console.log(FlagInfo)
    API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: FlagInfo.StoreNum,
        SK: 'profile',
        Status: FlagInfo.Status,
        emailData: FlagInfo.emailData,
        DMetricsFlag: FlagInfo.DMetricsFlag,
        WMetricsFlag: FlagInfo.WMetricsFlag,
        PMetricsFlag: FlagInfo.PMetricsFlag,
      }
    }).then((v) => {
      console.log(v)
    })
  }

  enableWFlag(FlagInfo: any, metrics: any) {
    metrics.Value = "Enable"
    API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: FlagInfo.StoreNum,
        SK: 'profile',
        Status: FlagInfo.Status,
        emailData: FlagInfo.emailData,
        DMetricsFlag: FlagInfo.DMetricsFlag,
        WMetricsFlag: FlagInfo.WMetricsFlag,
        PMetricsFlag: FlagInfo.PMetricsFlag,
      }
    }).then((v) => {
      console.log(v)
    })
  }

  disableWFlag(FlagInfo: any, metrics: any) {
    metrics.Value = "Disable"
    API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: FlagInfo.StoreNum,
        SK: 'profile',
        Status: FlagInfo.Status,
        emailData: FlagInfo.emailData,
        DMetricsFlag: FlagInfo.DMetricsFlag,
        WMetricsFlag: FlagInfo.WMetricsFlag,
        PMetricsFlag: FlagInfo.PMetricsFlag,
      }
    }).then((v) => {
      console.log(v)
    })
  }

  enablePFlag(FlagInfo: any, metrics: any) {
    metrics.Value = "Enable"
    API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: FlagInfo.StoreNum,
        SK: 'profile',
        Status: FlagInfo.Status,
        emailData: FlagInfo.emailData,
        DMetricsFlag: FlagInfo.DMetricsFlag,
        WMetricsFlag: FlagInfo.WMetricsFlag,
        PMetricsFlag: FlagInfo.PMetricsFlag,
      }
    }).then((v) => {
      console.log(v)
    })
  }

  disablePFlag(FlagInfo: any, metrics: any) {
    metrics.Value = "Disable"
    API.put('MapsDataFlowCRUD', '/items/updateStore', {
      body: {
        StoreNum: FlagInfo.StoreNum,
        SK: 'profile',
        Status: FlagInfo.Status,
        emailData: FlagInfo.emailData,
        DMetricsFlag: FlagInfo.DMetricsFlag,
        WMetricsFlag: FlagInfo.WMetricsFlag,
        PMetricsFlag: FlagInfo.PMetricsFlag,
      }
    }).then((v) => {
      console.log(v)
    })
  }

}
