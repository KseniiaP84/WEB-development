const SortLib = {
  prepareArray(input) {
    const arr = [];
    let undefinedCount = 0;

    for (let i = 0; i < input.length; i++) {
      if (input[i] === undefined) {
        undefinedCount++;
      } else {
        arr.push(input[i]);
      }
    }

    return {
      values: arr,
      undefinedCount: undefinedCount,
      originalLength: input.length
    };
  },

  restoreUndefined(sortedValues, undefinedCount, asc = true) {
    const result = sortedValues.slice();

    for (let i = 0; i < undefinedCount; i++) {
      if (asc) {
        result.push(undefined);
      } else {
        result.unshift(undefined);
      }
    }

    return result;
  },

  printResult(methodName, original, result, comparisons, moves, undefinedCount, outputId = null) {
    let text = `Метод: ${methodName}\n`;
    text += `Початковий масив: [${original.join(", ")}]\n`;
    text += `Результат: [${result.join(", ")}]\n`;
    text += `Кількість порівнянь: ${comparisons}\n`;
    text += `Кількість обмінів/переміщень: ${moves}\n`;

    if (undefinedCount > 0) {
      text += `У масиві виявлено undefined-елементи: ${undefinedCount}\n`;
      text += `Після обробки вони перенесені ${result[0] === undefined ? "на початок" : "в кінець"} масиву.\n`;
    }

    text += "---------------------------------------------\n";

    console.log(text);

    if (outputId) {
      document.getElementById(outputId).textContent += text + "\n";
    }
  },

  compare(a, b, asc = true) {
    return asc ? a > b : a < b;
  },

  bubbleSort(input, asc = true, outputId = null) {
    const original = input.slice();
    const prepared = this.prepareArray(input);
    const arr = prepared.values.slice();

    let comparisons = 0;
    let moves = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        comparisons++;
        if (this.compare(arr[j], arr[j + 1], asc)) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          moves++;
        }
      }
    }

    const result = this.restoreUndefined(arr, prepared.undefinedCount, asc);
    this.printResult("Сортування обміну", original, result, comparisons, moves, prepared.undefinedCount, outputId);
    return result;
  },

  selectionSort(input, asc = true, outputId = null) {
    const original = input.slice();
    const prepared = this.prepareArray(input);
    const arr = prepared.values.slice();

    let comparisons = 0;
    let moves = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      let targetIndex = i;

      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        if (asc ? arr[j] < arr[targetIndex] : arr[j] > arr[targetIndex]) {
          targetIndex = j;
        }
      }

      if (targetIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[targetIndex];
        arr[targetIndex] = temp;
        moves++;
      }
    }

    const result = this.restoreUndefined(arr, prepared.undefinedCount, asc);
    this.printResult("Сортування мінімальних елементів", original, result, comparisons, moves, prepared.undefinedCount, outputId);
    return result;
  },

  insertionSort(input, asc = true, outputId = null) {
    const original = input.slice();
    const prepared = this.prepareArray(input);
    const arr = prepared.values.slice();

    let comparisons = 0;
    let moves = 0;

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0) {
        comparisons++;
        if (asc ? arr[j] > key : arr[j] < key) {
          arr[j + 1] = arr[j];
          moves++;
          j--;
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      moves++;
    }

    const result = this.restoreUndefined(arr, prepared.undefinedCount, asc);
    this.printResult("Сортування вставками", original, result, comparisons, moves, prepared.undefinedCount, outputId);
    return result;
  },

  shellSort(input, asc = true, outputId = null) {
    const original = input.slice();
    const prepared = this.prepareArray(input);
    const arr = prepared.values.slice();

    let comparisons = 0;
    let moves = 0;
    let gap = Math.floor(arr.length / 2);

    while (gap > 0) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i];
        let j = i;

        while (j >= gap) {
          comparisons++;
          if (asc ? arr[j - gap] > temp : arr[j - gap] < temp) {
            arr[j] = arr[j - gap];
            moves++;
            j -= gap;
          } else {
            break;
          }
        }

        arr[j] = temp;
        moves++;
      }

      gap = Math.floor(gap / 2);
    }

    const result = this.restoreUndefined(arr, prepared.undefinedCount, asc);
    this.printResult("Сортування Шелла", original, result, comparisons, moves, prepared.undefinedCount, outputId);
    return result;
  },

  quickSort(input, asc = true, outputId = null) {
    const original = input.slice();
    const prepared = this.prepareArray(input);
    const arr = prepared.values.slice();

    let comparisons = 0;
    let moves = 0;

    const partition = (array, left, right) => {
      let pivot = array[Math.floor((left + right) / 2)];
      let i = left;
      let j = right;

      while (i <= j) {
        while (true) {
          comparisons++;
          if (asc ? array[i] < pivot : array[i] > pivot) {
            i++;
          } else {
            break;
          }
        }

        while (true) {
          comparisons++;
          if (asc ? array[j] > pivot : array[j] < pivot) {
            j--;
          } else {
            break;
          }
        }

        if (i <= j) {
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          moves++;
          i++;
          j--;
        }
      }

      return i;
    };

    const quickSortRecursive = (array, left, right) => {
      if (left >= right) return;

      let index = partition(array, left, right);

      if (left < index - 1) {
        quickSortRecursive(array, left, index - 1);
      }

      if (index < right) {
        quickSortRecursive(array, index, right);
      }
    };

    quickSortRecursive(arr, 0, arr.length - 1);

    const result = this.restoreUndefined(arr, prepared.undefinedCount, asc);
    this.printResult("Швидке сортування Хоара", original, result, comparisons, moves, prepared.undefinedCount, outputId);
    return result;
  }
};
