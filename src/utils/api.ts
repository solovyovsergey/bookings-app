export const getData = (url: string) =>
  fetch(url).then((resp) => {
    if (!resp.ok) throw new Error("There was a problem fetching dada");

    return resp.json();
  });
