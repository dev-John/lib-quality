import test from "ava";
import { isLessThanAnHour } from "../../utils";

test('isLessThanAnHour | tells us if the value is less than an hour | pass test', (t) => {
  const isLess = isLessThanAnHour('2021-04-16T01:19:09.839+00:00');

  isLess ? 
    t.truthy(isLess, 'It should be true') : 
    t.falsy(isLess, 'It should be false')
})