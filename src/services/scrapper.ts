import { PublicationData } from "../types/publicationData";
export class ScrapperServices {
    static startListeningForSSE(
      url: string,
      handleData: (dataUpdater: (prevState: PublicationData[]) => PublicationData[]) => void,
      handleComunicate: (message: string) => void
    ) {
      const encodedUrl = encodeURIComponent(url);
      const eventSource = new EventSource(`http://localhost:3000/scrapper?link=${encodedUrl}`);
  
      eventSource.onmessage = (event) => {
        try {
          const newData: PublicationData = JSON.parse(event.data);
          handleData((prevState) => [...prevState, newData]);
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      };
  
      // Escuchar el evento específico 'comunicate'
      eventSource.addEventListener('comunicate', (event) => {
        try {
          const message = JSON.parse(event.data).message;
          console.log('Llego un mensaje:', message);
          handleComunicate(message);
        } catch (error) {
          console.error('Error parsing comunicate event data:', error);
        }
      });
  
      // Escuchar el evento específico 'done'
      eventSource.addEventListener('done', (event) => {
        console.log('Scraping completado:', event.data);
        eventSource.close();  // Cierra la conexión cuando termina
      });
  
      // Manejar errores
      eventSource.onerror = (error) => {
        console.error('Error occurred:', error);
      };
    }
  }
  