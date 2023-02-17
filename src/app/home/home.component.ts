import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
    document.getElementById('header')!.style.display = "none";
    document.getElementById('footer')!.style.display = "none";
    
    document.getElementById('containerDiv')!.style.height = "100vh";
    document.getElementById('containerDiv')!.style.background = "none";
    // document.getElementById('amplify-authenticator')!.style.display = "none";

    // console.log(document.getElementById('amplify-authenticator')!.style.display = "none");

    // console.log((document.getElementsByTagName('amplify-authenticator')[0] as HTMLElement).style.backgroundImage = 'none')
    // console.log((document.getElementsByTagName('amplify-authenticator')[0] as HTMLElement).style.display = 'inline')
   }

  ngOnInit(): void {
  }

}
