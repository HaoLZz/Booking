export default function getData(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw Error('Error in fetching data!');
    }

    return res.json();
  });
}
