import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/ui/catalyst/fieldset";
import { Input } from "@/components/ui/catalyst/input";
import { Select } from "@/components/ui/catalyst/select";
import { Text } from "@/components/ui/catalyst/text";
import { Textarea } from "@/components/ui/catalyst/textarea";

export default function WfProperty() {
  return (
    <Fieldset>
      <Legend>节点属性</Legend>
      <Text>设置节点属性。</Text>
      <FieldGroup>
        <Field>
          <Label>名称</Label>
          <Input name="street_address" />
        </Field>
        <Field>
          <Label>颜色</Label>
          <Select name="country">
            <option>Canada</option>
            <option>Mexico</option>
            <option>United States</option>
          </Select>
          <Description>We currently only ship to North America.</Description>
        </Field>
        <Field>
          <Label>描述</Label>
          <Textarea name="notes" />
          <Description>
            If you have a tiger, we'd like to know about it.
          </Description>
        </Field>
      </FieldGroup>
    </Fieldset>
  );
}
