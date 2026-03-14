export async function generatePortfolio(
  prompt: string,
  risk: string = "medium"
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/generate-portfolio`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        risk,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate portfolio");
  }

  const data = await response.json();
  return data.portfolio;
}
