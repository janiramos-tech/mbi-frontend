
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import {inject, Injectable} from '@angular/core';
import {IPaginatedResultDto} from '../../shared/dtos/paginatedResult.dto';

@Injectable({ providedIn: 'root' })
export abstract class BaseService<T> {
  protected readonly http = inject(HttpClient);
  private readonly configService = inject(ConfigService);

  // Cada serviço filho deve definir seu próprio endpoint (ex: 'produtos')
  protected abstract readonly endpoint: string;

  protected get baseUrl(): string {
    return this.configService.getApiBaseUrl();
  }
  protected get fullUrl(): string {
    return `${this.configService.getApiBaseUrl()}/${this.endpoint}`;
  }

  getAll(params?: any): Observable<IPaginatedResultDto<T>> {
    return this.http.get<IPaginatedResultDto<T>>(`${this.fullUrl}/`, {
      params: this.mapParams(params)
    });
  }

  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.fullUrl}/${id}/`);
  }

  // POST - Create
  create(data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}/`, data);
  }

  // PUT - Update (Geralmente requer ID na URL)
  update(id: string | number, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}/`, data);
  }

  // DELETE
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}/`);
  }

  // Transforma objeto JS em HttpParams do Angular (Evita montagem manual de string)
  private mapParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          httpParams = httpParams.append(key, String(value));
        }
      });
    }
    return httpParams;
  }
}
