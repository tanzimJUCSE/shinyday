export const isLocal = window.location.hostname === 'localhost';
export const API_BASE = isLocal ? 'http://localhost:7071/api' : 'https://shinydayfunctions.azurewebsites.net/api'; 