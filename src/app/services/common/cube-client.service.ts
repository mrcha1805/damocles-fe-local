import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import cubejs, { CubejsApi } from '@cubejs-client/core';
import { environment } from '@environments/environment';
import { customAlphabet } from 'nanoid';


@Injectable({
  providedIn: 'root'
})
export class CubeClientService {
  private CUBEJS_API_SECRET = "secret";

  constructor(
  ) {
    }
   private cubeOption(){
      const API_URL = environment.DigitalCo.endpointApiCube;
      const SglId = localStorage.getItem('X-Sgl-Id') || '';
      const authorization = localStorage.getItem('Authorization') || '';

      const cubejsOptions = {
        apiUrl: API_URL,
        headers:{
          "X-Transaction-Id":this.transactionId(),
        // "X-Sgl-Id":SglId,
        // "Authorization":authorization,
        // "x-tid":generateTId()
      },
      method:"POST" 
     }

     return cubejsOptions;
    }

   private transactionId():string {
      const dateString = formatDate(new Date(), 'yyMMdd', 'en-US');
      const random = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 12);
      return `${dateString}${random()}`;
    }
  
    private generateTId(): string {
      const dateString = formatDate(new Date(), 'yyMMdd', 'en-US');
      const random = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 12);
      return `SGL-${dateString}${random()}`;
    }

    public cubeApi():CubejsApi{
      const cubeApi = cubejs(this.CUBEJS_API_SECRET,this.cubeOption())
      return cubeApi;
    }
   }




