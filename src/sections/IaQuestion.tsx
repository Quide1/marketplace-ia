import { BotIcon } from "lucide-react";
import { useDataContext } from "../context/dataContext";
import { geminiServices } from "../services/gemini";
import { useEffect, useRef, useState } from "react";
import { GenerateTextResponse } from "../types/gemini";
import IaTableData from "../components/IaTableData";
import TableGeneral from "../components/TableGeneral";

function IaQuestion() {

  const { favData } = useDataContext();
  const [messageError, setMessageError] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const [iaResponse, setIaResponse] = useState<GenerateTextResponse>({
    message: "Sin Mensaje",
    articlesResponse: [{uuid:""}],
  });

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return; // Verifica que formRef esté disponible

    const newFormData = new FormData(formRef.current);
    const entriesForm = Array.from(newFormData.values());
    const promptQuestion = entriesForm[0] as string;

    if (favData.length <= 0) {
      setMessageError(
        "No se puede hacer una consulta sin artículos en favorito"
      );
      return;
    }

    try {
      const response = await geminiServices.getResponse({
        questionPrompt: promptQuestion,
        dataArticles: favData,
      });
      console.log(response)
      if (response.status === "200") {
        const { articlesResponse, message } = response.data;
        setIaResponse({
          articlesResponse,
          message,
        });
        setMessageError(""); // Limpiar mensaje de error en caso de éxito
      } else {
        setMessageError("Hubo un problema al obtener la respuesta de la IA.");
        return
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setMessageError("Ocurrió un error al consultar la IA.");
    }
  };


  return (
    <section className="container bg-gray-50 p-6 rounded-md shadow-lg">
      {/* Sección de la pregunta */}
      <div className="space-y-4 flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-700">
          Pregúntale algo a la IA en base a tus artículos favoritos, y te
          mostrará el artículo y un mensaje relacionado.
        </p>
        <form
          ref={formRef}
          onSubmit={onSubmitHandler}
          className="w-full h-full flex flex-col gap-2 items-center"
        >
          <textarea
            name="question-ia"
            className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="¿Qué auto me conviene si mi capital es de $3000 pesos?"
          ></textarea>
          <button className="flex flex-row items-center justify-center p-3 bg-yellow-600 rounded-lg gap-2 hover:bg-yellow-500 transition-all hover:scale-105">
            <BotIcon />
            <p className="font-bold">Enviar</p>
          </button>
        </form>

        {messageError && (
          <p className="text-xl font-bold text-red-700 uppercase">
            {messageError}
          </p>
        )}
      </div>

      {/* Sección de la respuesta */}
      <div className="space-y-4">
        <p className="text-lg font-semibold text-gray-700">
          Respuesta de la IA
        </p>
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-white min-h-[150px] text-gray-500 flex items-center justify-center">
  {iaResponse.articlesResponse.length > 0 && iaResponse.articlesResponse[0].uuid !== '' ? (
    <TableGeneral>
      {favData
        .filter(fav => {
          const favUuid = fav.uuid;
          console.log('UUID de favorito:', favUuid);

          // Extraer los UUIDs de articlesResponse
          const responseUuids = iaResponse.articlesResponse.map(article => article.uuid);
          console.log('UUIDs de respuesta:', responseUuids);

          // Comprobar si el UUID del artículo favorito está en los UUIDs de la respuesta
          const match = responseUuids.includes(favUuid);
          console.log(`¿El UUID ${favUuid} está en la respuesta?`, match);

          return match;
        }) // Filtrar los artículos de favData
        .map((article) => (
          <IaTableData {...article} key={article.uuid} /> // Renderizar solo los artículos filtrados
        ))}
    </TableGeneral>
  ) : (
    <p>Aquí aparecerán los artículos que cumplan con lo que le pediste.</p>
  )}
</div>




      </div>
    </section>
  );
}

export default IaQuestion;
