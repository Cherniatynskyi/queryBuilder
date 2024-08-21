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

  const handleSubmit = async () => {
    await onSubmit(rules, ruleSets);
  };

  const addRule = () => {
    setRules([...rules, { field: 'title', operator: 'contains', value: '' }]);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: string) => {
    const updatedRules = [...rules];
    console.log(field)
    updatedRules[index].field = field;
    setRules(updatedRules);
  };

  const handleOperatorChange = (index: number, operator: string) => {
    const updatedRules = [...rules];
    console.log(operator)
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
    <form>
      <h3>Query Builder</h3>
      {rules.map((rule, index) => (
        <div key={index}>
          <select onChange={(e) => handleFieldChange(index, e.target.value)}>
          {Object.keys(availableFields).map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
          <select onChange={(e) => handleOperatorChange(index, e.target.value)}>
            {availableFields[rule.field].map((op: string, i: number) => {
                return (
                <option key={i} value={op}>
                    {op}
                </option>)
            })}
          </select>
          <input
            type="text"
            onChange={(e) => handleValueChange(index, e.target.value)}
            required
          />
          <button onClick={() => removeRule(index)}>Remove Rule</button>
        </div>
      ))}
      <button onClick={addRule}>Add Rule</button>
      <button onClick={exportToJSON}>Export to JSON</button>
      <button onClick={handleSubmit} className='ml-6' type='submit'>Submit</button>
    </form>
  );
};

export default QueryBuilder;