export function search_something(key_name: string, value_name: string) {
  if (value_name) {
    return {
      [key_name]: {
        $regex: value_name,
        $options: 'i',
      },
    };
  } else {
    return {};
  }
}
