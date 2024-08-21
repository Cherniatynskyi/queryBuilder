export type Rule = {
    field: string;
    operator: string;
    value: string | number;
  };
  
export type RuleSet = {
    rules: Rule[];
    combineWith: 'AND' | 'OR';
  };
  
export type QueryBuilderProps = {
      onSubmit: (rules: Rule[], ruleSets: RuleSet[]) => Promise<void>;
  };
  
export type Field = 'title' | 'description' | 'price' | 'quantity';
  
export type Operator = 
    | '>' 
    | '<' 
    | '<=' 
    | '>=' 
    | 'contains' 
    | 'not_contains' 
    | 'equals' 
    | 'not_equals';
  
export const availableFields: { [key in Field]: Operator[] } = {
      title: ['contains', 'not_contains', 'equals', 'not_equals'],
      description: ['contains', 'not_contains', 'equals', 'not_equals'],
      price: ['>', '<', '<=', '>='],
      quantity: ['>', '<', '<=', '>='],
  };