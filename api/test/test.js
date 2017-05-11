import test from 'ava'
import request from 'supertest'

test('graph:toYaml', async t => {
  t.plan(2);

  let hostUri = 'http://localhost:8182'

  const res = await request(hostUri)
    .post('/api/graphtoyaml')
    .send({
      graph: require('./bm.json')
    });

  t.is(res.status, 200);
  t.is(res.body, '- someYaml');
});
