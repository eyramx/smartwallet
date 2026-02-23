/**
 * Simple keyword-based categorization engine.
 * Maps common description keywords to likely category names.
 */

const KEYWORD_MAP: Record<string, string[]> = {
  Food: [
    "food",
    "restaurant",
    "cafe",
    "coffee",
    "lunch",
    "dinner",
    "breakfast",
    "grocery",
    "groceries",
    "supermarket",
    "pizza",
    "burger",
    "uber eats",
    "bolt food",
  ],
  Transport: [
    "transport",
    "fuel",
    "gas",
    "uber",
    "bolt",
    "taxi",
    "bus",
    "train",
    "metro",
    "parking",
  ],
  Entertainment: [
    "entertainment",
    "movie",
    "cinema",
    "netflix",
    "spotify",
    "game",
    "gaming",
    "steam",
    "concert",
    "bar",
    "club",
  ],
  Utilities: [
    "utility",
    "utilities",
    "water",
    "electricity",
    "electric",
    "gas bill",
    "internet",
    "wifi",
    "phone bill",
    "mobile",
    "recharge",
  ],
  Shopping: [
    "shopping",
    "amazon",
    "aliexpress",
    "mall",
    "clothes",
    "shoes",
    "electronics",
    "gift",
    "gifts",
  ],
  Health: [
    "health",
    "med",
    "medicine",
    "pharmacy",
    "hospital",
    "clinic",
    "dentist",
    "gym",
    "fitness",
  ],
  Salary: ["salary", "payroll", "dividend", "interest", "bonus"],
};

/**
 * Predicts a category name based on the description text.
 * @param description The transaction description.
 * @returns The predicted category name or null if no match found.
 */
export function predictCategory(description: string): string | null {
  if (!description) return null;

  const lowerDesc = description.toLowerCase();

  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((keyword) => lowerDesc.includes(keyword.toLowerCase()))) {
      return category;
    }
  }

  return null;
}
