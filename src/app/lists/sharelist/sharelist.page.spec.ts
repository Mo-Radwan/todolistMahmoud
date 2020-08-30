import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharelistPage } from './sharelist.page';

describe('SharelistPage', () => {
  let component: SharelistPage;
  let fixture: ComponentFixture<SharelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
