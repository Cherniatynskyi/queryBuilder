import React, { useState } from 'react';
import { Rule, RuleSet, QueryBuilderProps, Field, Operator, availableFields } from '@/utils/builderTypes';


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

  return (
    <div className='p-10'>
      <button className='text-white text-lg bg-green-500 p-5 rounded-md hover:bg-green-600 transition-colors' onClick={addRule}>Add Rule +</button>
      <button  onClick={handleSubmit} className='text-white text-lg bg-blue-500 p-5 rounded-md ml-6  hover:bg-blue-600 transition-colors' type='submit'>Submit</button>
      <ul className='bg-slate-200 rounded-lg w-[45%] p-5 mt-5'>
      {rules.map((rule, index) => (
        <div key={index} className='p-5 bg-slate-100 flex justify-between items-center'>
          <label htmlFor="field">
            <select onChange={(e) => handleFieldChange(index, e.target.value)} name='field' className='p-3 border-2 rounded-md cursor-pointer hover:border-blue-600 '>
            {Object.keys(availableFields).map((field) => (
                <option key={field} value={field}>
                    {field}
                </option>
                ))}
            </select>
          </label>
          <label htmlFor="option">
            <select onChange={(e) => handleOperatorChange(index, e.target.value)} name='option' className='p-3 border-2 rounded-md cursor-pointer  hover:border-blue-600'>
                {availableFields[rule.field].map((op: string, i: number) => {
                    return (
                    <option key={i} value={op}>
                        {op}
                    </option>)
                })}
            </select>
          </label>
          <label htmlFor="value">
            <input
                type="text"
                name='value'
                className='p-3 border-2 rounded-md cursor-pointer  hover:border-blue-600'
                onChange={(e) => handleValueChange(index, e.target.value)}  
            />
          </label>
          <button className='p-3 border-2 rounded-md cursor-pointer bg-red-500 text-white  hover:bg-red-600' onClick={() => removeRule(index)}>Remove Rule</button>
        </div>
      ))}
      </ul>
    </div>
  );
};

export default QueryBuilder;