import { Injectable } from '@angular/core';
import {URLS} from '../../../app.urls';
import {BaseService} from '../../../core/services/base.service';
import {StateDto} from '../models/state.dto';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BaseService<StateDto> {

  protected readonly endpoint = URLS.STATE;


}
