import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

interface DriveTokenResponse {
  enabled: boolean;
  accessToken?: string;
  folderId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DriveUploadService {
  private http = inject(HttpClient);
  private baseURL = environment.apiUrl;

  async getDriveSession(): Promise<DriveTokenResponse> {
    return firstValueFrom(
      this.http.get<DriveTokenResponse>(`${this.baseURL}/media/drive-token`)
    );
  }

  async uploadFileDirect(file: File, session: DriveTokenResponse): Promise<string> {
    if (!session.enabled || !session.accessToken) {
      throw new Error('Google Drive direct upload is not enabled');
    }

    const metadata: Record<string, any> = {
      name: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    };
    if (session.folderId) {
      metadata['parents'] = [session.folderId];
    }

    const initRes = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': file.type || 'application/octet-stream',
          'X-Upload-Content-Length': String(file.size)
        },
        body: JSON.stringify(metadata)
      }
    );

    if (!initRes.ok) {
      const errText = await initRes.text();
      throw new Error(`Drive upload init failed: ${errText}`);
    }

    const uploadUrl = initRes.headers.get('Location');
    if (!uploadUrl) {
      throw new Error('Drive resumable upload URL missing');
    }

    const putRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'application/octet-stream'
      },
      body: file
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      throw new Error(`Drive file upload failed: ${errText}`);
    }

    const uploaded = await putRes.json();
    const fileId = uploaded?.id;
    if (!fileId) {
      throw new Error('Drive upload did not return a file ID');
    }

    await firstValueFrom(
      this.http.post(`${this.baseURL}/media/drive-public/${fileId}`, {})
    );

    return `media/drive/${fileId}`;
  }
}
