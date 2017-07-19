import chai from 'chai';
import apiInstance from '../api-instance';
import { createWebsiteCreateSuccessData, createWebsiteCreateInvalidData } from '../utils';

const expect = chai.expect;
const api = apiInstance;

describe('when I get a list of websites', () => {
  let websites;
  let error;
  before(async () => {
    try {
      websites = await api.websites.getAll();
    }
    catch(err) {
      error = err;
      console.log(err);
    }
  });

  it('should define a property called total', () => {
    expect(websites.total).to.not.be.undefined;
  });
  it('should define a property called offset', () => {
    expect(websites.offset).to.not.be.undefined;
  });
  it('should define a property called limit', () => {
    expect(websites.limit).to.not.be.undefined;
  });
  it('should define a property called response', () => {
    expect(websites.response).to.not.be.undefined;
  });
  it('should have an array of items', () => {
    expect(websites.items).to.be.an('array');
  });
  it('should have a method named getJSON', () => {
    expect(websites.getJSON).to.be.a('function');
  });

  it('should return a plain JSON object defining items as an array, when using getJSON', () => {
    expect(websites.getJSON().items).to.be.an('array');
  });
});


describe('when I create a website successful', () => {
  let website;
  let error;
  before(async () => {
    try {
      const data = createWebsiteCreateSuccessData();
      website = await api.websites.create({id:'', data: data});
    }
    catch(err) {
      error = err;
      console.log(err);
    }
  });

  it('should define a property called response', () => {
    expect(website.response).to.not.be.undefined;
  });

  it('should define a property called fields', () => {
    expect(website.fields).to.not.be.undefined;
  });

  it('should have a method named getJSON', () => {
    expect(website.getJSON).to.be.a('function');
  });

  it('should return status 201 inside response', () => {
    expect(website.response.status).to.equal('201');
  });

  it('should define a property called id inside fields', () => {
    expect(website.fields.id).to.not.be.undefined;
  });
  it('should define a property called name inside fields', () => {
    expect(website.fields.name).to.not.be.undefined;
  });
  it('should define a property called url inside fields', () => {
    expect(website.fields.url).to.not.be.undefined;
  });
  it('should define a property called servicePhone inside fields', () => {
    expect(website.fields.servicePhone).to.not.be.undefined;
  });
  it('should define a property called serviceEmail inside fields', () => {
    expect(website.fields.serviceEmail).to.not.be.undefined;
  });
  it('should define a property called checkoutPageUri inside fields', () => {
    expect(website.fields.checkoutPageUri).to.not.be.undefined;
  });

  it('should define a property called customFields inside fields', () => {
    expect(website.fields.customFields).to.not.be.undefined;
  });
});


describe('when I create a website failed because invalid data', () => {
  let website;
  let error;
  before(async () => {
    try {
      const data = createWebsiteCreateInvalidData();
      website = await api.websites.create({id:'', data: data});
    }
    catch(err) {
      error = err;
      console.log(err);
    }
  });

  it('should define a property called error', () => {
    expect(website.response).to.not.be.undefined;
  });

  it('should define a property called fields', () => {
    expect(website.fields).to.not.be.undefined;
  });

  it('should have a method named getJSON', () => {
    expect(website.getJSON).to.be.a('function');
  });


  it('should define a property called id inside fields', () => {
    expect(website.fields.id).to.not.be.undefined;
  });
  it('should define a property called name inside fields', () => {
    expect(website.fields.name).to.not.be.undefined;
  });
  it('should define a property called url inside fields', () => {
    expect(website.fields.url).to.not.be.undefined;
  });
  it('should define a property called servicePhone inside fields', () => {
    expect(website.fields.servicePhone).to.not.be.undefined;
  });
  it('should define a property called serviceEmail inside fields', () => {
    expect(website.fields.serviceEmail).to.not.be.undefined;
  });
  it('should define a property called checkoutPageUri inside fields', () => {
    expect(website.fields.checkoutPageUri).to.not.be.undefined;
  });

  it('should define a property called customFields inside fields', () => {
    expect(website.fields.customFields).to.not.be.undefined;
  });
});
