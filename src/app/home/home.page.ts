import { HardwareChartComponent } from './../hardware-chart/hardware-chart.component';
import { Gyroscope, GyroscopeOptions, GyroscopeOrientation } from '@ionic-native/gyroscope/ngx';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonSlides } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(IonSlides) slide: IonSlides;

  @ViewChild('motion') motionComponent: HardwareChartComponent;
  @ViewChild('gyroscope') gyroscopeComponent: HardwareChartComponent;

  subscription: Subscription;

  optionsDeviceMotion: DeviceMotionAccelerometerOptions = {
    frequency: 1000
  };

  optionsGyroscope: GyroscopeOptions = {
    frequency: 1000
  };

  constructor(
    private deviceMotion: DeviceMotion,
    private gyroscope: Gyroscope,
    private screenOrientation: ScreenOrientation,
  ) { }
  ngAfterViewInit(): void {
    // this.initChart();
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);


    this.subscription = this.deviceMotion.watchAcceleration(this.optionsDeviceMotion).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.motionComponent.addData(acceleration);
    });

    this.subscription = this.gyroscope.watch(this.optionsGyroscope).subscribe((gyroscope: GyroscopeOrientation) => {
      this.gyroscopeComponent.addData(gyroscope);
    });

  }


  segmentChanged(event) {
    event.detail.value == 'motion' ? this.slide.slideTo(0) : this.slide.slideTo(1);
  }

}
