$(document).ready(function () {
  let selectedBrand = "";
  let to = 0;
  let from = 0;

  let brands = [
    "All Brands",
    "Arata",
    "Auric Beauty",
    "Beard Hood",
    "Beardo",
    "Colorbar",
    "Coloressence",
    "Disguise Cosmetics",
    "DoYou",
    "Echt Beauti",
    "GLAMVEDA",
    "Globus Naturals",
    "Juicy Chemistry",
    "Khadi Essentials",
    "La French",
    "LetsShave",
    "MCaffeine",
    "Mancode",
    "Nishman",
    "Organic B",
    "Pee Safe",
    "Pinq",
    "Prolixr",
    "Pulp Cosmetics",
    "Sirona",
    "Skin Secrets",
    "St Botanica",
    "TAC - The Ayurveda Co.",
    "The Beauty Co",
    "The Woman's Company",
    "Ustraa",
  ];

  function brandsElementsAdd() {
    brands.forEach((brand) => {
      let div = document.querySelector(".dropdown_brand");
      let a = document.createElement("a");
      a.setAttribute("href", "#");
      a.classList.add("brand-dropdown_items");
      a.innerHTML = brand;
      a.addEventListener("click", function () {
        selectedBrand = brand;
        if (brand === "All Brands") {
          display_table({});
        } else {
          update_table({ brand });
        }
        $(".brand_input")[0].value = `${brand}`;
      });
      div.append(a);
    });
  }
  brandsElementsAdd();

  $(".brand_input").on("keypress", function (e) {
    let div = document.querySelector(".dropdown_brand");
    div.innerHTML = "";
    document
      .getElementById("myDropdown1")
      .classList.add("showDropdown", "selective_dropdown");
    let arr = [];
    brands.forEach((brand) => {
      if (brand.toLowerCase().includes(e.target.value)) {
        arr.push(brand);
      }
    });
    arr.forEach((brand) => {
      let a = document.createElement("a");
      a.setAttribute("href", "#");
      a.classList.add("brand-dropdown_items");
      a.innerHTML = brand;
      a.addEventListener("click", function () {
        selectedBrand = brand;
        if (brand === "All Brands") {
          display_table({});
        } else {
          update_table({ brand });
        }
        $(".brand_input")[0].value = `${brand}`;
      });
      div.append(a);
    });
  });

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  let yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
  let df = yesterday
    .toJSON()
    .toString()
    .slice(0, yesterday.toJSON().toString().indexOf("T"));

  today = yyyy + "-" + mm + "-" + dd;
  dd = yesterday.getDate();
  mm = yesterday.getMonth() + 1;
  yyyy = yesterday.getFullYear();
  yesterday = mm + "/" + dd + "/" + yyyy;
  console.log({ today, yesterday, dd, mm, yyyy });

  $(function () {
    $('input[name="daterange"]').daterangepicker(
      {
        opens: "left",
        maxDate: yesterday,
        startDate: yesterday,
      },
      function (start, end, label) {
        console.log(
          "A new date selection was made: " +
            start.format("YYYY-MM-DD") +
            " to " +
            end.format("YYYY-MM-DD")
        );
        to = end.format("YYYY-MM-DD");
        from = start.format("YYYY-MM-DD");
        update_table({ to, from });
      }
    );
  });
  // document.querySelector("#report_cal2").setAttribute("value", today);
  // document.querySelector("#report_cal2").setAttribute("max", today);
  // document.querySelector("#report_cal1").setAttribute("max", df);

  // $("#report_cal1").on("change", function() {
  //   val = $(this)[0].value.toString()
  //   from = val
  //   update_table({from})
  // })
  // $("#report_cal2").on("change", function() {
  //   val = $(this)[0].value.toString()
  //   to = val
  //   update_table({to})
  // })

  function table_structure(res) {
    let resp = res.mainTable;
    let arr0 = ["IV", "IV Users", "ATCs", "ATC Users", "Orders", "Purchaser"];
    let arr1 = ["ASP", "AOV", "Quantity/ Order", "Conversion Rate"];
    let arr2 = ["MRP", "Qty", "Discount%"];
    let arr3 = ["NMV"];
    let flag = true;
    try {
      while (flag) {
        let d = document.querySelector(".report_element");
        if (d !== null) {
          d.remove();
        }
        let i = document.querySelector("tr");
        if (i !== null) {
          i.remove();
        }
        if (d === null && i === null) {
          flag = false;
        }
      }
    } catch (e) {
      console.log(e);
    }

    arr0.forEach((key) => {
      let div = document.createElement("div");
      div.classList.add("report_element", "report_element1");
      let p1 = document.createElement("p");
      p1.innerHTML = key;
      p1.classList.add("report-element_heading");
      let p2 = document.createElement("p");
      p2.innerHTML = resp[key] || "N/A";
      p2.classList.add("report-element_count");
      div.append(p1, p2);
      $("#report_heading1_div").append(div);
    });

    arr1.forEach((key) => {
      let div = document.createElement("div");
      div.classList.add("report_element", "report_element2");
      let p1 = document.createElement("p");
      p1.innerHTML = key;
      p1.classList.add("report-element_heading");
      let p2 = document.createElement("p");
      p2.innerHTML = resp[key] || "N/A";
      if (key === "Conversion Rate") {
        p2.innerHTML = resp.convrsn_rate || "N/A";
      }
      p2.classList.add("report-element_count");
      div.append(p1, p2);
      $("#report_heading2_div").append(div);
    });

    arr2.forEach((key) => {
      let div = document.createElement("div");
      div.classList.add("report_element", "report_element3");
      let p1 = document.createElement("p");
      p1.innerHTML = key;
      p1.classList.add("report-element_heading");
      let p2 = document.createElement("p");
      p2.innerHTML = resp[key] || "N/A";
      p2.classList.add("report-element_count");
      div.append(p1, p2);
      $("#report_heading3_div").append(div);
    });

    arr3.forEach((key) => {
      let div = document.createElement("div");
      div.classList.add("report_element", "report_element4");
      let p1 = document.createElement("p");
      p1.innerHTML = key;
      p1.classList.add("report-element_heading", "report-element_heading4");
      let p2 = document.createElement("p");
      p2.innerHTML = resp[key] || "N/A";
      p2.classList.add("report-element_count", "report-element_count_4");
      div.append(p1, p2);
      $("#report_heading4_div").append(div);
    });

    // let table_data = [
    //   ["Brand", "Qty", "MRP", "NMV", "Retail"],
    //   ["Good Vibes", 5, 500, 654, 5463],
    //   ["Good Vibes", 5, 500, 654, 5463],
    //   ["Good Vibes", 5, 500, 654, 5463],
    //   ["Good Vibes", 5, 500, 654, 5463],
    //   ["Good Vibes", 5, 500, 654, 5463],
    // ];
    // table_data.forEach((element, index) => {
    //   let row = document.createElement("tr");
    //   if (index === 0) {
    //     // row.classList.add("report_table_header")
    //     console.log(index);
    //     element.forEach((data) => {
    //       let header = document.createElement("TH");
    //       header.classList.add("report_table-data", "report_table_header");
    //       header.innerHTML = data;
    //       row.append(header);
    //     });
    //     $(".report_brandwise_table").append(row);
    //   } else {
    //     element.forEach((data) => {
    //       let row_data = document.createElement("td");
    //       row_data.classList.add("report_table-data");
    //       row_data.innerHTML = data;
    //       row.append(row_data);
    //     });
    //     $(".report_brandwise_table").append(row);
    //   }
    // });
    // let table_data = [
    //   [
    //     "Brand",
    //     "Qty",
    //     "MRP",
    //     "NMV",
    //     "Retail",
    //     "Orders",
    //     "Coupons",
    //     "IV",
    //     "IV Users",
    //     "convrsn_rate",
    //     "ATC/IV Users",
    //     "NMV/IV",
    //     "NMV/User",
    //     "ATCs",
    //     "ATC_Users",
    //     "AOV",
    //     "ASP",
    //     "Dscount%",
    //     "Freebie_",
    //     "Freebie_Qty",
    //   ],
    // ];
    let table_data = [
      [
        "Brand",
        "IV",
        "IV Users",
        "ATCs",
        "ATC_Users",
        "Orders",
        "Purchasers",
        "ASP",
        "AOV",
        "Qty",
        "convrsn_rate",
        "MRP",
        "NMV",
        "Discount%",
      ],
    ];
    table_data.forEach((element, index) => {
      let row = document.createElement("tr");
      if (index === 0) {
        // row.classList.add("report_table_header")
        console.log(index, element);
        element.forEach((data, index) => {
          let header = document.createElement("TH");
          header.classList.add(
            "report_table-data",
            "report_table_header",
            "table_data"
          );
          header.innerHTML = data;
          if (data === "Brand") {
            header.classList.add("table_brand");
          }
          row.append(header);
        });
        $(".report_brandwise_table").append(row);
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

        const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
            )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
        
        // do the work...
        document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
            const table = th.closest('table');
            console.log({table})
            Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
                .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
                .forEach(tr => table.appendChild(tr) );
        })));
        console.log(document.querySelectorAll('th'))
      }
    });
    let tab;
    if (res.brandWise.length >= 1) {
      tab = res.brandWise;
    } else {
      res.brandWise.Brand = selectedBrand;
      tab = [res.brandWise];
    }
    tab.forEach((element) => {
      let row = document.createElement("tr");
      table_data[0].forEach((data) => {
        let val = element[data] || "N/A";
        let row_data = document.createElement("td");
        row_data.classList.add("report_table-data", "table_data");
        row_data.innerHTML = val;
        if (data === "Brand") {
          row_data.classList.add("table_brand");
        }
        row.append(row_data);
      });
      $(".report_brandwise_table").append(row);
    });
  }

  function display_table(payload) {
    data = JSON.stringify(payload);
    $.ajax({
      type: "GET",
      url: "http://34.132.95.222:8081/v1/getalldata",
      data: data,
      crossDomain: true,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      success: function (res) {
        console.log(res);
        table_structure(res);
        // let resp = res.mainTable;
        // let arr0 = [
        //   "IV",
        //   "IV Users",
        //   "ATCs",
        //   "ATC Users",
        //   "Orders",
        //   "Purchaser",
        // ];
        // let arr1 = [
        //   "ASP",
        //   "AOV",
        //   "Quantity/ Order",
        //   "Conversion Rate"
        // ];
        // let arr2 = ["MRP", "Qty", "Discount %"];
        // let arr3 = ["NMV"];
        // let flag = true
        // try{
        //   while (flag){
        //     let d = document.querySelector(".report_element")
        //     if(d!==null){
        //       d.remove()
        //     }
        //     let i = document.querySelector("tr")
        //     if(i!==null){
        //       i.remove()
        //     }
        //     if(d === null && i === null){
        //       flag = false
        //     }
        //   }
        // } catch(e){
        //   console.log(e)
        // }

        // arr0.forEach((key) => {
        //   let div = document.createElement("div");
        //   div.classList.add("report_element", "report_element1");
        //   let p1 = document.createElement("p");
        //   p1.innerHTML = key;
        //   p1.classList.add("report-element_heading");
        //   let p2 = document.createElement("p");
        //   p2.innerHTML = resp[key] || "N/A";
        //   p2.classList.add("report-element_count");
        //   div.append(p1, p2);
        //   $("#report_heading1_div").append(div);
        // });

        // arr1.forEach((key) => {
        //   let div = document.createElement("div");
        //   div.classList.add("report_element", "report_element2");
        //   let p1 = document.createElement("p");
        //   p1.innerHTML = key;
        //   p1.classList.add("report-element_heading");
        //   let p2 = document.createElement("p");
        //   p2.innerHTML = resp[key] || "N/A";
        //   p2.classList.add("report-element_count");
        //   div.append(p1, p2);
        //   $("#report_heading2_div").append(div);
        // });

        // arr2.forEach((key) => {
        //   let div = document.createElement("div");
        //   div.classList.add("report_element", "report_element3");
        //   let p1 = document.createElement("p");
        //   p1.innerHTML = key;
        //   p1.classList.add("report-element_heading");
        //   let p2 = document.createElement("p");
        //   p2.innerHTML = resp[key] || "N/A";
        //   p2.classList.add("report-element_count");
        //   div.append(p1, p2);
        //   $("#report_heading3_div").append(div);
        // });

        // arr3.forEach((key) => {
        //   let div = document.createElement("div");
        //   div.classList.add("report_element", "report_element4");
        //   let p1 = document.createElement("p");
        //   p1.innerHTML = key;
        //   p1.classList.add("report-element_heading", "report-element_heading4");
        //   let p2 = document.createElement("p");
        //   p2.innerHTML = resp[key] || "N/A";
        //   p2.classList.add("report-element_count", "report-element_count_4");
        //   div.append(p1, p2);
        //   $("#report_heading4_div").append(div);
        // });

        // // let table_data = [
        // //   ["Brand", "Qty", "MRP", "NMV", "Retail"],
        // //   ["Good Vibes", 5, 500, 654, 5463],
        // //   ["Good Vibes", 5, 500, 654, 5463],
        // //   ["Good Vibes", 5, 500, 654, 5463],
        // //   ["Good Vibes", 5, 500, 654, 5463],
        // //   ["Good Vibes", 5, 500, 654, 5463],
        // // ];
        // // table_data.forEach((element, index) => {
        // //   let row = document.createElement("tr");
        // //   if (index === 0) {
        // //     // row.classList.add("report_table_header")
        // //     console.log(index);
        // //     element.forEach((data) => {
        // //       let header = document.createElement("TH");
        // //       header.classList.add("report_table-data", "report_table_header");
        // //       header.innerHTML = data;
        // //       row.append(header);
        // //     });
        // //     $(".report_brandwise_table").append(row);
        // //   } else {
        // //     element.forEach((data) => {
        // //       let row_data = document.createElement("td");
        // //       row_data.classList.add("report_table-data");
        // //       row_data.innerHTML = data;
        // //       row.append(row_data);
        // //     });
        // //     $(".report_brandwise_table").append(row);
        // //   }
        // // });
        // // let table_data = [
        // //   [
        // //     "Brand",
        // //     "Qty",
        // //     "MRP",
        // //     "NMV",
        // //     "Retail",
        // //     "Orders",
        // //     "Coupons",
        // //     "IV",
        // //     "IV Users",
        // //     "convrsn_rate",
        // //     "ATC/IV Users",
        // //     "NMV/IV",
        // //     "NMV/User",
        // //     "ATCs",
        // //     "ATC_Users",
        // //     "AOV",
        // //     "ASP",
        // //     "Dscount%",
        // //     "Freebie_",
        // //     "Freebie_Qty",
        // //   ],
        // // ];
        // let table_data = [
        //   [
        //     "Brand",
        //     "IV",
        //     "IV Users",
        //     "ATCs",
        //     "ATC_Users",
        //     "Orders",
        //     "Purchasers",
        //     "ASP",
        //     "AOV",
        //     "Qty",
        //     "convrsn_rate",
        //     "MRP",
        //     "NMV",
        //     "Dscount%"
        //   ],
        // ];
        // table_data.forEach((element, index) => {
        //   let row = document.createElement("tr");
        //   if (index === 0) {
        //     // row.classList.add("report_table_header")
        //     console.log(index, element);
        //     element.forEach((data) => {
        //       let header = document.createElement("TH");
        //       header.classList.add(
        //         "report_table-data",
        //         "report_table_header",
        //         "table_data"
        //       );
        //       header.innerHTML = data;
        //       if (data === "Brand") {
        //         header.classList.add("table_brand");
        //       }
        //       row.append(header);
        //     });
        //     $(".report_brandwise_table").append(row);
        //   }
        // });
        // let tab = res.brandWise;
        // tab.forEach((element) => {
        //   let row = document.createElement("tr");
        //   table_data[0].forEach((data) => {
        //     let val = element[data] || "N/A";
        //     let row_data = document.createElement("td");
        //     row_data.classList.add("report_table-data", "table_data");
        //     row_data.innerHTML = val;
        //     if (data === "Brand") {
        //       row_data.classList.add("table_brand");
        //     }
        //     row.append(row_data);
        //   });
        //   $(".report_brandwise_table").append(row);
        // });
      },
      error: function (request, error) {
        console.log(request, error);
        alert("No data available for the brand!");
      },
    });
  }
  display_table({});

  function update_table(payload) {
    if (from === 0) {
      yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
      from = yesterday
        .toJSON()
        .toString()
        .slice(0, yesterday.toJSON().toString().indexOf("T"));
    }
    if (to === 0) {
      yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
      to = yesterday
        .toJSON()
        .toString()
        .slice(0, yesterday.toJSON().toString().indexOf("T"));
    }
    let data = { brand: selectedBrand, to, from, ...payload };
    let body_data = JSON.stringify(data);
    console.log(body_data);
    $.ajax({
      type: "POST",
      url: "http://34.132.95.222:8081/v1/getDataByFilter",
      data: body_data,
      crossDomain: true,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      success: function (res) {
        console.log(res);
        table_structure(res);
        // if(selectedBrand === ''){
        //   table_structure(res)
        // } else{

        // let div1_children = [
        //   ...document.querySelector("#report_heading1_div").children,
        // ];
        // let div2_children = [
        //   ...document.querySelector("#report_heading2_div").children,
        // ];
        // let div3_children = [
        //   ...document.querySelector("#report_heading3_div").children,
        // ];
        // let div4_children = [
        //   ...document.querySelector("#report_heading4_div").children,
        // ];
        // //console.log(div1_children)
        // div1_children.forEach((child) => {
        //   child.children[1].innerHTML =
        //     res[child.children[0].innerHTML] || "N/A";
        // });
        // div2_children.forEach((child) => {
        //   child.children[1].innerHTML =
        //     res[child.children[0].innerHTML] || "N/A";
        // });
        // div3_children.forEach((child) => {
        //   child.children[1].innerHTML =
        //     res[child.children[0].innerHTML] || "N/A";
        // });
        // div4_children.forEach((child) => {
        //   child.children[1].innerHTML =
        //     res[child.children[0].innerHTML] || "N/A";
        // });

        // let old_table = document.querySelector("#report_brandwise_table");
        // old_table.remove();
        // let table = document.createElement("table");
        // table.classList.add("report_brandwise_table");
        // table.setAttribute("id", "report_brandwise_table");
        // let container = document.querySelector(
        //   ".report_brandwise_table_container"
        // );
        // container.append(table);
        // let table_data = [
        //   [
        //     "Brand",
        //     "IV",
        //     "IV Users",
        //     "ATCs",
        //     "ATC_Users",
        //     "Orders",
        //     "Purchasers",
        //     "ASP",
        //     "AOV",
        //     "Qty",
        //     "convrsn_rate",
        //     "MRP",
        //     "NMV",
        //     "Dscount%"
        //   ],
        // ];
        // table_data.forEach((element, index) => {
        //   let row = document.createElement("tr");
        //   if (index === 0) {
        //     // row.classList.add("report_table_header")
        //     console.log(index, element);
        //     element.forEach((data) => {
        //       let header = document.createElement("TH");
        //       header.classList.add(
        //         "report_table-data",
        //         "report_table_header",
        //         "table_data"
        //       );
        //       header.innerHTML = data;
        //       if (data === "Brand") {
        //         header.classList.add("table_brand");
        //       }
        //       row.append(header);
        //     });
        //     $(".report_brandwise_table").append(row);
        //   }
        // });
        //   let row = document.createElement("tr");
        //   table_data[0].forEach((data) => {
        //     let val
        //     val = res[data] || "N/A";
        //     if(data === 'Brand'){
        //       val = selectedBrand
        //     }
        //     let row_data = document.createElement("td");
        //     row_data.classList.add("report_table-data", "table_data");
        //     row_data.innerHTML = val;
        //     if (data === "Brand") {
        //       row_data.classList.add("table_brand");
        //     }
        //     row.append(row_data);
        //   });
        //   $(".report_brandwise_table").append(row);
        // }
      },
      error: function (xhr, status, error) {
        $(".brand_input")[0].value = `${selectedBrand}`;
        console.log(xhr, status, error);
        var err = xhr.responseJSON;
        alert(err.message);
      },
    });
  }

  function sortTable(index) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("report_brandwise_table");
    switching = true;
    console.log("click", index);
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < rows.length - 1; i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[index];
        y = rows[i + 1].getElementsByTagName("TD")[index];
        //check if the two rows should switch place:
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

  $("#dropbtn1").on("click", function () {
    $(this).toggleClass("dropbtn1_after");
    $(this).removeClass("selective_dropdown");
    document.getElementById("myDropdown1").classList.toggle("showDropdown");
    document.querySelector(".brand_input").setAttribute("autofocus", "true");
  });

  $(".brand_input").on("click", function () {
    console.log("click");
    document.getElementById("myDropdown1").classList.toggle("showDropdown");
  });

  window.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      let btn = document.getElementById("dropbtn1");
      if (btn.classList.contains("dropbtn1_after")) {
        btn.classList.remove("dropbtn1_after");
      }
      let inp = document.querySelector(".brand_input");
      //inp.setAttribute("value", '')
      let dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("showDropdown")) {
          openDropdown.innerHTML = "";
          openDropdown.classList.remove("showDropdown");
          openDropdown.classList.remove("selective_dropdown");
        }
      }
      brandsElementsAdd();
    }
  };
});
