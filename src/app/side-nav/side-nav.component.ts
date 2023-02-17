import { Component, OnInit } from '@angular/core';
import { API, Auth } from 'aws-amplify';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  agentName: any;

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
    this.agentName = localStorage.getItem("agentName")
    if (localStorage.getItem("agentName") == null) {
      Auth.currentUserInfo().then((v) => {
        console.log(v)
        this.agentName = v.attributes.name
        localStorage.setItem("agentName", this.agentName)
      })
    }
  }

  logOut() {
    Auth.signOut()
      .then((value) => console.log(value))
      .catch((e) => console.log(e))
      .finally(() => {
        let currentUrl = this.router.url;
        location.reload();
      });
  }

  ngOnDestroy() {
    localStorage.removeItem("agentName")
  }


}
