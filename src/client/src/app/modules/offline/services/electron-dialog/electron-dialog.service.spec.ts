import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ElectronDialogService } from './electron-dialog.service';
import { SharedModule, ConfigService } from '@sunbird/shared';
import { CoreModule, PublicDataService, DataService } from '@sunbird/core';
import { of } from 'rxjs';

describe('ElectronDialogService', () => {
  let service: ElectronDialogService;
  const mockConfigService = {
    urlConFig: {
      URLS: {
        ELECTRON_DIALOG: {
          CONTENT_SUGGEST_LOCATION: 'content/suggestLocation'
        }
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule.forRoot(), CoreModule],
      providers: [ElectronDialogService, DataService, { provide: ConfigService, useValue: mockConfigService }]
    });
    service = TestBed.get(ElectronDialogService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call showContentLocationChangePopup', () => {
    const publicDataService = TestBed.get(PublicDataService);

    spyOn(publicDataService, 'post').and.returnValue(of({ name: 'test' }));
    console.log('service', service.showContentLocationChangePopup());
    const resp = service.showContentLocationChangePopup().subscribe((data) => {
      expect(data).toBeDefined();
      expect(data).toBeTruthy();
    });

    expect(resp).toBeDefined();
  });
});
