import { Injectable } from "@angular/core";
import { AnonymousCredential, BlobServiceClient } from "@azure/storage-blob";

@Injectable({providedIn: 'root'})

export class AzureStorageService {
    private containerName = 'metalverse';
    private blobServiceClient: BlobServiceClient;
    imageUrl: string = "";
    
    constructor() {
        this.blobServiceClient = new BlobServiceClient('https://metalversestorage.blob.core.windows.net', new AnonymousCredential());
    }

    async uploadImageToAzureBlob(file: File): Promise<void> {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        const blobName = `${new Date().getTime()}_${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
        try {
          await blockBlobClient.uploadBrowserData(file);
          this.imageUrl =  blockBlobClient.url;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
    }
}