import chai from 'chai';
import apiInstance from '../api-instance';
import {createWebsiteData} from '../utils';

const expect = chai.expect;
const api = apiInstance;

describe('when I get a list of websites', () => {
  let websites, error;

  it('I can get status code 200 and response, items property and getJSON methods if get successfully', async () => {
    websites = await api.websites.getAll();
    expect(websites.response.status).to.be.equal(200);
    expect(websites.items).to.be.an('array');
    expect(websites.getJSON).to.be.a('function');
  });
});


describe('when I create a website', () => {
  const data = createWebsiteData();

  it('I can get status code 201 and field property if create successfully', async () => {
    const website = await api.websites.create({id: '', data: data});
    expect(website.response.status).to.be.equal(201);
    expect(website.fields).to.be.a('object');
  });

  it('I can get status code 422 if create website without url', async () => {
    data.url = '';
    let website, error;
    try {
      website = await api.websites.create({id: '', data: data});
    }
    catch (err) {
      error = err;
    }
    expect(error.response.status).to.be.equal(422);
  });

  it('I can get status code 422 if create website without website name', async () => {
    data.name = '';
    let website, error;
    try {
      website = await api.websites.create({id: '', data: data});
    }
    catch (err) {
      error = err;
    }
    expect(error.response.status).to.be.equal(422);
  });

  it('I can get status code 422 if create website without phone number', async () => {
    data.servicePhone = '';
    let website, error;
    try {
      website = await api.websites.create({id: '', data: data});
    }
    catch (err) {
      error = err;
    }
    expect(error.response.status).to.be.equal(422);
  });

  it('I can get status code 422 if create website without email', async () => {
    data.serviceEmail = '';
    let website, error;
    try {
      website = await api.websites.create({id: '', data: data});
    }
    catch (err) {
      error = err;
    }
    expect(error.response.status).to.be.equal(422);
  });

});

describe('when I get a website', () => {

  it('I can get status code 200 and field property if get successfully', async () => {
    const website = await api.websites.get({id: '5dc8279b-0fa0-4111-99b6-d45f785d4497'});
    expect(website.response.status).to.be.equal(200);
    expect(website.fields).to.be.a('object');
  });

  it('I can get status code 404 if get website with wrong id', async () => {
    let website, error;
    try {
      website = await api.websites.get({id: '123'});
    }
    catch (err) {
      error = err;
    }
    expect(error.response.status).to.be.equal(404);
  });

});


describe('when I update a website', () => {


});




