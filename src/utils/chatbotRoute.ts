export function parseChatbotIdParam(id: string | undefined): number | null {
  if (!id) {
    return null;
  }

  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}
