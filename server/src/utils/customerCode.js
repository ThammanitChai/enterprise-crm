export const generateCustomerCode = async (CustomerModel) => {
    const year = new Date().getFullYear();
    const count = await CustomerModel.countDocuments();
    const nextNumber = String(count + 1).padStart(5, '0');
    return `CUST-${year}-${nextNumber}`;
  };