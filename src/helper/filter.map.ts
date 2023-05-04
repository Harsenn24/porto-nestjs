/* eslint-disable prettier/prettier */
export function filter_map(
  // eslint-disable-next-line prettier/prettier
  var_loop: string,
  inner_data: string,
  outer_data: string,
) {
  const result = {
    $first: {
      $filter: {
        input: {
          $map: {
            input: var_loop,
            in: {
              $cond: {
                if: { $eq: [inner_data, outer_data] },
                then: outer_data,
                else: [],
              },
            },
          },
        },
        as: 'varr',
        cond: {
          $ne: ['$$varr', []],
        },
      },
    },
  };

  return result;
}
