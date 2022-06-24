export const getHtmlTextLength = (html: string) => {
  if (!html)
    return 0;
  return html.replace(/<[^<]*>/g, '').replace(/&\w+;/g, ' ').length;
}
