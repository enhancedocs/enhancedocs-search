export async function processStream (stream: ReadableStream, callback: (text: string, result?: any) => void) {
  const reader = stream.getReader();
  const decoder = new TextDecoder('utf-8');
  let text = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    const chunk = decoder.decode(value, { stream: true });

    try {
      const result = JSON.parse(chunk);
      if (result.answerId) {
        callback(text, result);
        break;
      } else {
        text += chunk;
        callback(text, undefined);
      }
    } catch (error) {
      text += chunk;
      callback(text, undefined);
    }
  }
}
