import { EmpresaService } from './empresa/empresa.service';
import { EmpresaModule } from './empresa/empresa.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';





@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmpresaModule,
    SharedModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpModule





  ],
  providers: [EmpresaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
