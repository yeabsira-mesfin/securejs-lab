import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('SecureJS Lab modules and curriculum have no serious WCAG failures',async({page})=>{
 await page.goto('/');
 for(const section of ['labs','curriculum']){
  if(section==='curriculum')await page.getByRole('button',{name:'Curriculum'}).click();
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(result.violations.filter(v=>['serious','critical'].includes(v.impact)).map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 }
});