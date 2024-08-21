import React, { useState } from 'react';

export type Rule = {
  field: string;
  operator: string;
  value: string | number;
};

type RuleSet = {
  rules: Rule[];
  combineWith: 'AND' | 'OR';
};

type QueryBuilderProps = {
    onSubmit: (rules: Rule[], ruleSets: RuleSet[]) => Promise<void>;
};

type Field = 'title' | 'description' | 'price' | 'quantity';

type Operator = 
  | '>' 
  | '<' 
  | '<=' 
  | '>=' 
  | 'contains' 
  | 'not_contains' 
  | 'equals' 
  | 'not_equals';

const availableFields: { [key in Field]: Operator[] } = {
    title: ['contains', 'not_contains', 'equals', 'not_equals'],
    description: ['contains', 'not_contains', 'equals', 'not_equals'],
    price: ['>', '<', '<=', '>='],
    quantity: ['>', '<', '<=', '>='],
  };

const QueryBuilder: React.FC<QueryBuilderProps> = ({onSubmit}) => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [ruleSets, setRuleSets] = useState<RuleSet[]>([]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(rules, ruleSets);
  };

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: string) => {
    const updatedRules = [...rules];
    updatedRules[index].field = field;
    setRules(updatedRules);
  };

  const handleOperatorChange = (index: number, operator: string) => {
    const updatedRules = [...rules];
    updatedRules[index].operator = operator;
    setRules(updatedRules);
  };

  const handleValueChange = (index: number, value: string | number) => {
    const updatedRules = [...rules];
    updatedRules[index].value = value;
    setRules(updatedRules);
  };

  const exportToJSON = () => {
    const config = { rules, ruleSets };
    console.log(JSON.stringify(config));
  };

  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
      <h3>Query Builder</h3>
      {rules.map((rule, index) => (
        <div key={index}>
          <select onChange={(e) => handleFieldChange(index, e.target.value)}>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
            <option value="title">Title</option>
            <option value="description">Description</option>
          </select>
          <select onChange={(e) => handleOperatorChange(index, e.target.value)}>
            <option value=">">Greater than</option>
            <option value="<">Less than</option>
            <option value=">=">Greater or equal</option>
            <option value="<=">Less or equal</option>
            <option value="contains">contains</option>
            <option value="not_contains">not contains</option>
            <option value="equals">equals</option>
            <option value="not_equals">not equals</option>
          </select>
          <input
            type="text"
            onChange={(e) => handleValueChange(index, e.target.value)}
          />
          <button onClick={() => removeRule(index)}>Remove Rule</button>
        </div>
      ))}
      <button onClick={addRule}>Add Rule</button>
      <button onClick={exportToJSON}>Export to JSON</button>
      <button className='ml-6' type='submit'>Submit</button>
    </form>
  );
};

export default QueryBuilder;