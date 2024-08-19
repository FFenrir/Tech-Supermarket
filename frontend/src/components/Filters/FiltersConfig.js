const axios = require('axios');

async function fetchUniqueValues(endpoint, key) {
    try {
      const response = await axios.get(endpoint);
      const uniqueValues = new Set(response.data.map(item => item[key]));
      return Array.from(uniqueValues); // Convert Set to array
    } catch (error) {
      console.error(`Error fetching ${key} values:`, error);
      return [];
    }
  }
  
  async function getUniqueValues(model) {
    const baseUrl = 'http://127.0.0.1:8000/store';
    switch (model) {
      case 'laptops':
        const laptopBrands = await fetchUniqueValues(`${baseUrl}/laptops`, 'brand');
        const laptopProcessors = await fetchUniqueValues(`${baseUrl}/laptops`, 'processor');
        const laptopRams = await fetchUniqueValues(`${baseUrl}/laptops`, 'ram');
        console.log('Laptop unique values:', { brands: laptopBrands, processors: laptopProcessors, rams: laptopRams });
        return { brands: laptopBrands, processors: laptopProcessors, rams: laptopRams };
      case 'gpu':
        const gpuBrands = await fetchUniqueValues(`${baseUrl}/graphics_cards`, 'brand');
        const gpuMemoryTypes = await fetchUniqueValues(`${baseUrl}/graphics_cards`, 'memory_interface');
        const gpuRAMSize = await fetchUniqueValues(`${baseUrl}/graphics_cards`, 'graphics_card_ram_size');
        console.log('GPU unique values:', { brands: gpuBrands, memoryTypes: gpuMemoryTypes , ramSize:gpuRAMSize});
        return { brands: gpuBrands, memoryTypes: gpuMemoryTypes, ramSize:gpuRAMSize  };
      // Add more models as needed
      default:
        return {};
    }
  }
  
  // Example usage:
  (async () => {
    const laptopData = await getUniqueValues('laptops');
    console.log('Laptop data:', laptopData);
  
    const gpuData = await getUniqueValues('gpu');
    console.log('GPU data:', gpuData);
  })();