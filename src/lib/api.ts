import { ParsedUrlQuery } from 'querystring';

export const performSaveAction = (text: string) => {
  return fetch(`/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://mentry.apap04.com/',
    },

    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      content: text,
    }),
  });
};

export const performEditAction = (
  text: string,
  editCode: string,
  query: ParsedUrlQuery
) => {
  return fetch(`/api/${query.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://mentry.apap04.com/',
    },

    body: JSON.stringify({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      content: text,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      editCode: editCode,
    }),
  });
};
