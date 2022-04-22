export const ikipos_menu = [
    {
        title: "Menu",
        link: [
            {
                name: "Tổng quan",
                class: "report_view",

                to: "/dashboard",
                icon: "fa fa-eye",

                exact: true,
            },
            {
                name: "Bán hàng tại quầy",
                class: "order_list",

                icon: "fa-credit-card",
                exact: true,
                to: "/pos",
            },
            {
                name: "Đơn hàng",
                class: "order_list",

                icon: "fa-file-invoice",
                exact: true,
                to: "/order",
            },

            {
                name: "Sản phẩm",

                icon: "fas fa-th-large",
                open: "inventory",
                children: [
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Danh mục sản phẩm",
                        exact: true,
                        to: "/product/category",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Sản phẩm",
                        exact: true,
                        to: "/product/index",
                    },

                    // {
                    //     class: "customer_config_point",
                    //     display: "hide",
                    //     name: "In mã vạch",
                    //     exact: true,
                    //     to: "/product/index",
                    // },
                ],
            },

            {
                name: "Báo cáo",

                icon: "fas fa-chart-bar",
                open: "report",
                children: [
                    {
                        class: "order_list",
                        display: "hide",
                        name: "Báo cáo chung",
                        exact: true,
                        to: "/report",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Báo cáo kho ",
                        exact: true,
                        to: "/report_inventory",
                    },
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Báo cáo tài chính",
                        exact: true,
                        to: "/report_finance",
                    },
                ],
            },

            {
                name: "Kho hàng",

                icon: "fas fa-store",
                open: "inventory",
                children: [
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Tồn kho",
                        exact: true,
                        to: "/product_inventory/index",
                    },
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Phiếu kiểm kho",
                        exact: true,
                        to: "/inventory/index",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Nhập hàng",
                        exact: true,
                        to: "/import_stocks/index",
                    },
                ],
            },


            {
                name: "Khách hàng",

                icon: "fas fa-user",
                open: "customer",
                children: [
                    {
                        class: "customer_list",
                        display: "hide",
                        name: "Danh sách khách hàng",
                        exact: true,
                        to: "/customer",
                    },
                    {
                        class: "customer_config_point",
                        display: "hide",
                        name: "Xu thưởng",
                        exact: true,
                        to: "/reward_point",
                    },
                ],
            },

            {
                name: "Nhà cung cấp",
                class: "post_category_list",
                display: "hide",
                icon: "fas fa-building",
                exact: true,
                to: "/supplier",
            },
            {
                name: "Thu chi",
                display: "hide",
                icon: "fa-coins",
                exact: true,
                to: "/revenue_expenditure",
                itemHasTabName: "agency",
            },

            {
                name: "Chấm công",
                icon: "fa fa-calendar",
        
                open: "promotion",
                // open: "timekeeping",
        
                children: [
                  {
                    name: "Ca làm việc",
                    class: "promotion_discount_list",
                    display: "hide",
                    icon: "fas fa-clock-nin",
                    exact: true,
                    to: "/shift",
        
                    // class: "timekeeping_shift",
                  },
                  {
                    class: "promotion_voucher_list",
        
                    name: "Lịch làm việc",
                    // class: "timekeeping_work_schedule",
                    display: "hide",
                    icon: "fas fa-fw fa-calendar-days",
                    exact: true,
                    to: "/calendar_shift",
                  },
                  {
                    class: "promotion_voucher_list",
        
                    name: "Bảng công",
        
                    display: "hide",
                    icon: "fas fa-fw fa-calendar-days",
                    exact: true,
                    to: "/time_sheet",
                  },
                  {
                    class: "promotion_combo_list",
        
                    name: "Địa điểm làm việc",
                    // class: "timekeeping_work_location",
                    display: "hide",
                    icon: "fas fa-fw fa-location-dot",
        
                    exact: true,
                    to: "/work_location",
                  },
                  {
                    class: "promotion_combo_list",
        
                    name: "Xử lý yêu cầu",
                    // class: "timekeeping_work_location",
                    display: "hide",
                    icon: "fas fa-fw fa-location-dot",
        
                    exact: true,
                    to: "/request",
                  },
                ],
              },
            {
                name: "Cài đặt",

                icon: "fas fa-cogs",
                open: "setting",
                children: [
                    // {
                    //   name: "Chỉnh sửa giao diện",
                    //   class : "web_theme_edit",
                    //   display : "hide",
                    //   exact: true,
                    //   to: "/theme",
                    // },
                    {
                        name: "Chi nhánh",
                        class: "web_theme_edit",
                        display: "hide",
                        exact: true,
                        to: "/branch/index",
                    },

                    {
                        name: "Nhân viên",
                        class: "staff_list",
                        display: "hide",
                        exact: true,
                        to: "/staff/index",
                    },

                    {
                        name: "Cài đặt phân quyền",
                        class: "decentralization_list",
                        display: "hide",
                        exact: true,
                        to: "/decentralization/index",
                    },
                    {
                        name: "Giảm giá sản phẩm",
                        class: "promotion_discount_list",
                        display: "hide",
                        icon: "fas-usd-circle",
                        exact: true,
                        to: "/discount",
                    },
                    {
                        name: "Voucher giảm giá hóa đơn",
                        class: "promotion_voucher_list",
                        display: "hide",
                        icon: "fas fa-fw fa-cog",
                        exact: true,
                        to: "/voucher",
                    },
                    {
                        name: "Combo giảm giá",
                        class: "promotion_combo_list",
                        display: "hide",
                        icon: "fas fa-fw fa-cog",
                        exact: true,
                        to: "/combo",
                    },
                    {
                        name: "Cài đặt chung",
                        class: "web_theme_edit",
                        display: "hide",
                        exact: true,
                        to: "/setting/index",
                    },
                ],
            },


        ],
    },

];
