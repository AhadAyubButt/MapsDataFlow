import { Component, OnDestroy, OnInit } from "@angular/core";
import { Modal } from "bootstrap";
import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";
import { IMetrics, Metrics, PMetrics, WMetrics } from "../../interfaces/i-metrics";
import { FormControl } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { API } from "aws-amplify";
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-list-metrics',
  templateUrl: './list-metrics.component.html',
  styleUrls: ['./list-metrics.component.css'],
  providers: [DatePipe]
})
export class ListMetricsComponent implements OnInit {
  listMetrics : IMetrics[] = [];
  metricsInfo! : IMetrics;
  newListMetrics : IMetrics[] = [];
  DMetricsInfo:Metrics[] = [];
  WMetricsInfo:WMetrics[] = [];
  PMetricsInfo:PMetrics[] = [];
  StoreNum = '';
  form: FormGroup;
  newDate: any;
  loadingscreen: boolean = true;

  constructor(private fb: FormBuilder, public datepipe: DatePipe) { 
    let dateTime = new Date()
    let latest_date =this.datepipe.transform(dateTime, 'yyyy-MM-dd');
    
    this.form = this.fb.group({
      BusDate: [latest_date]
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    API.get('MapsDataFlowCRUD', '/items/listMetrics').then((value) =>{
      (value.Items as IMetrics[]).forEach((v) => {
        this.listMetrics.push(v);
      })
      this.listMetrics.filter((value) => {     
        if (`${value.CreateDate}`.includes(this.form.getRawValue().BusDate) == true){
          this.newListMetrics.push(value);
        }
        this.loadingscreen = false;
        })
    })
  }
  search(){
    this.newListMetrics = []
    this.loadingscreen = true;
    if(this.form.getRawValue().BusDate != ''){
      //@ts-ignore
      API.put('MapsDataFlowCRUD', '/items/getMetricsByDate', {
        body: {
          date: this.form.getRawValue().BusDate
        }
      }).then((v) => {
        (v.Items as IMetrics[]).forEach((v) => {
          this.listMetrics.push(v);
        })
        this.listMetrics.filter((value) => {     
          if (`${value.CreateDate}`.includes(this.form.getRawValue().BusDate) == true){
            this.newListMetrics.push(value);
          }
          this.loadingscreen = false;
          })
      })

      
      // // this.newDate = this.datepipe.transform(this.form.getRawValue().BusDate, 'MM/dd/yy')
      // this.listMetrics.filter((value) => {
        
      //   // console.log(`${value.BusDate}`.startsWith(this.newDate))
      //   if (`${value.CreateDate}`.startsWith(this.form.getRawValue().BusDate) == true){
          
      //   }
      //   // return(
      //     //   `${value.BusDate}`.includes(this.newDate)
      //     // )
      //   })
    }
  }
  createModal(SK:any){
    // const date = metrics.CreateDate.split(" ")[0]
    // console.log(date)
    // this.newListMetrics.forEach((v) => {
    //   if(v.StoreNum == metrics.StoreNum && v.CreateDate.includes(date)) {
    //     console.log(v)
    //     this.DMetricsInfo.push(...v.DMetrics)
    //     this.WMetricsInfo.push(...v.WMetrics)
    //     this.PMetricsInfo.push(...v.PMetrics)
    //   }
    // })

    let modal = Modal.getInstance(document.getElementById("#staticexampleModal")!);
    const getStore = async () => {
      // @ts-ignore
      const data = API.get('MapsDataFlowCRUD', '/items/getMetrics/' + SK);
      data.then((val) => {
        this.metricsInfo = val.Items[0];
        this.StoreNum = this.metricsInfo.StoreNum
        val.Items[0].DMetrics.forEach((v: any) =>{
          if(isNaN((Math.round((Number(v.Value) + Number.EPSILON) * 100) / 100))){
            // v.Value = v.value;
          }
          else{
            v.Value = Math.round((Number(v.Value) + Number.EPSILON) * 100) / 100;
          }
        });
        val.Items[0].PMetrics.forEach((v: any) =>{
          if(isNaN((Math.round((Number(v.Value) + Number.EPSILON) * 100) / 100))){
            // v.Value = v.value;
          }
          else{
            v.Value = Math.round((Number(v.Value) + Number.EPSILON) * 100) / 100;
          }
        });
        val.Items[0].WMetrics.forEach((v: any) =>{
          if(isNaN((Math.round((Number(v.Value) + Number.EPSILON) * 100) / 100))){
            // v.Value = v.value;
          }
          else{
            v.Value = Math.round((Number(v.Value) + Number.EPSILON) * 100) / 100;
          }
        });
      })
    }
    getStore().then();
  }

  closeModal(){
    this.metricsInfo.DMetrics = [];
    this.metricsInfo.WMetrics = [];
    this.metricsInfo.PMetrics = [];
    this.StoreNum = '';
    this.DMetricsInfo = [];
    this.WMetricsInfo = [];
    this.PMetricsInfo = [];
  }

}
