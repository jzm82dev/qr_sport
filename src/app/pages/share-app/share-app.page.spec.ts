import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShareAppPage } from './share-app.page';

describe('ShareAppPage', () => {
  let component: ShareAppPage;
  let fixture: ComponentFixture<ShareAppPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShareAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
