// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import products from '../../data/products.json';

type Product = {
    title: string;
    description: string;
    price: number;
    quantity: number;
};

type Rule = {
  field: keyof Product;
  operator: string;
  value: string | number;
};

type RuleSet = {
  rules: Rule[];
  combineWith: 'AND' | 'OR';
};



const applyRule = (product: Product, rule: Rule) => {
  const { field, operator, value } = rule;
  const productValue = product[field as keyof Product];

  switch (operator) {
    case '>':
      return productValue > value;
    case '<':
      return productValue < value;
    case '>=':
      return productValue >= value;
    case '<=':
      return productValue <= value;
    case 'contains':
      return typeof productValue === 'string' && productValue.includes(value as string);
    case 'not_contains':
      return typeof productValue === 'string' && !productValue.includes(value as string);
    case 'equals':
      return productValue === value;
    case 'not_equals':
      return productValue !== value;
    default:
      return false;
  }
};

const applyRuleSet = (product: Product, ruleSet: RuleSet) => {
  const { rules, combineWith } = ruleSet;

  if (combineWith === 'AND') {
    return rules.every(rule => applyRule(product, rule));
  } else if (combineWith === 'OR') {
    return rules.some(rule => applyRule(product, rule));
  }

  return false;
};

const filterProducts = (rules: Rule[], ruleSets: RuleSet[]) => {
  return products.filter(product => {
    const ruleResults = rules.map(rule => applyRule(product, rule));
    const ruleSetResults = ruleSets.map(ruleSet => applyRuleSet(product, ruleSet));

    return [...ruleResults, ...ruleSetResults].every(Boolean);
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { rules = [], ruleSets = [] } = req.body;
      const filteredProducts = filterProducts(rules, ruleSets);
      res.status(200).json({ products: filteredProducts });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }