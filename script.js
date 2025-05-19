document.addEventListener('DOMContentLoaded', () => {
    const questionsListDiv = document.getElementById('questions-list');
    const hintModal = document.getElementById('hint-modal');
    const hintQuestionTitle = document.getElementById('hint-question');
    const hintContentDiv = document.getElementById('hint-content');
    const closeBtn = document.querySelector('.close-btn');

    // Complete list of Fasal coding questions with hints and answers
    const fasalQuestions = [
        // ... (your existing question array remains the same)
         {
    "question": "Find the majority element in an array.",
    "description": "Identify the element that appears more than n/2 times.",
    "hint": "Use the Boyer-Moore Voting Algorithm.",
    "answer": `
      <pre><code class="language-javascript">
function majorityElement(nums) {
  let count = 0, candidate = null;
  for (let num of nums) {
    if (count === 0) candidate = num;
    count += (num === candidate) ? 1 : -1;
  }
  return candidate;
}
      </code></pre>
    `
  },
  {
    "question": "Find the longest substring without repeating characters.",
    "description": "Focuses on sliding window technique.",
    "hint": "Use a set to track characters and adjust window size.",
    "answer": `
      <pre><code class="language-javascript">
function lengthOfLongestSubstring(s) {
  let set = new Set(), maxLen = 0, left = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
      </code></pre>
    `
  },
  {
    "question": "Detect a cycle in a linked list.",
    "description": "Floyd's cycle detection algorithm.",
    "hint": "Use slow and fast pointers.",
    "answer": `
      <pre><code class="language-javascript">
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
      </code></pre>
    `
  },
  {
    "question": "Merge two sorted arrays.",
    "description": "Classic merge technique from merge sort.",
    "hint": "Use two pointers.",
    "answer": `
      <pre><code class="language-javascript">
function merge(arr1, arr2) {
  let i = 0, j = 0, result = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) result.push(arr1[i++]);
    else result.push(arr2[j++]);
  }
  return result.concat(arr1.slice(i)).concat(arr2.slice(j));
}
      </code></pre>
    `
  },
  {
    "question": "Validate a binary search tree.",
    "description": "In-order traversal should return sorted values.",
    "hint": "Use recursion with min and max bounds.",
    "answer": `
      <pre><code class="language-javascript">
function isValidBST(root, min = null, max = null) {
  if (!root) return true;
  if ((min !== null && root.val <= min) || (max !== null && root.val >= max))
    return false;
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}
      </code></pre>
    `
  },
  {
    "question": "Check if two strings are anagrams.",
    "description": "Use character count comparison.",
    "hint": "Sort or use frequency maps.",
    "answer": `
      <pre><code class="language-javascript">
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  let count = {};
  for (let char of s) count[char] = (count[char] || 0) + 1;
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}
      </code></pre>
    `
  },
  {
    "question": "Find first non-repeating character.",
    "description": "Return the first unique character's index.",
    "hint": "Use a hash map to count frequencies.",
    "answer": `
      <pre><code class="language-javascript">
function firstUniqChar(s) {
  const count = {};
  for (let ch of s) count[ch] = (count[ch] || 0) + 1;
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}
      </code></pre>
    `
  },
  {
    "question": "Reverse a linked list.",
    "description": "Iterative pointer reversal.",
    "hint": "Use three pointers: prev, curr, next.",
    "answer": `
      <pre><code class="language-javascript">
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
      </code></pre>
    `
  },
  {
    "question": "Find the missing number in an array of 0 to n.",
    "description": "Use XOR or sum formula.",
    "hint": "Sum of first n numbers minus array sum.",
    "answer": `
      <pre><code class="language-javascript">
function missingNumber(nums) {
  let n = nums.length;
  let sum = (n * (n + 1)) / 2;
  return sum - nums.reduce((a, b) => a + b, 0);
}
      </code></pre>
    `
  },
  {
    "question": "Implement a queue using stacks.",
    "description": "Use two stacks to simulate a queue.",
    "hint": "Push to one, pop from the other after reversal.",
    "answer": `
      <pre><code class="language-javascript">
class MyQueue {
  constructor() {
    this.in = [];
    this.out = [];
  }

  push(x) {
    this.in.push(x);
  }

  pop() {
    if (!this.out.length) {
      while (this.in.length) this.out.push(this.in.pop());
    }
    return this.out.pop();
  }

  peek() {
    if (!this.out.length) {
      while (this.in.length) this.out.push(this.in.pop());
    }
    return this.out[this.out.length - 1];
  }

  empty() {
    return !this.in.length && !this.out.length;
  }
}
      </code></pre>
    `
  },
  {
    "question": "Group Anagrams",
    "description": "Group strings that are anagrams of each other.",
    "hint": "Use a hashmap with sorted strings as keys.",
    "answer": `
      <pre><code class="language-javascript">
function groupAnagrams(strs) {
  const map = {};
  for (let str of strs) {
    let key = str.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(str);
  }
  return Object.values(map);
}
      </code></pre>
    `
  },
  {
    "question": "Valid Palindrome",
    "description": "Check if a string is a valid palindrome.",
    "hint": "Use two pointers and ignore non-alphanumeric characters.",
    "answer": `
      <pre><code class="language-javascript">
function isPalindrome(s) {
  s = s.replace(/[^a-z0-9]/gi, '').toLowerCase();
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
      </code></pre>
    `
  },
  {
    "question": "Find Duplicate Number",
    "description": "Find the single duplicate number in an array of n+1 integers.",
    "hint": "Use Floyd’s cycle detection algorithm.",
    "answer": `
      <pre><code class="language-javascript">
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}
      </code></pre>
    `
  },
  {
    "question": "Rotate Image",
    "description": "Rotate a matrix by 90 degrees clockwise.",
    "hint": "Transpose the matrix and then reverse each row.",
    "answer": `
      <pre><code class="language-javascript">
function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (let row of matrix) {
    row.reverse();
  }
}
      </code></pre>
    `
  },
  {
    "question": "Longest Consecutive Sequence",
    "description": "Find the length of the longest consecutive elements sequence.",
    "hint": "Use a set for constant-time lookups.",
    "answer": `
      <pre><code class="language-javascript">
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let max = 0;
  for (let num of nums) {
    if (!numSet.has(num - 1)) {
      let length = 0;
      while (numSet.has(num++)) length++;
      max = Math.max(max, length);
    }
  }
  return max;
}
      </code></pre>
    `
  },
  {
    "question": "Merge Intervals",
    "description": "Merge overlapping intervals in an array.",
    "hint": "Sort intervals by start time and merge as you go.",
    "answer": `
      <pre><code class="language-javascript">
function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];
  for (let interval of intervals) {
    if (!result.length || result[result.length - 1][1] < interval[0]) {
      result.push(interval);
    } else {
      result[result.length - 1][1] = Math.max(result[result.length - 1][1], interval[1]);
    }
  }
  return result;
}
      </code></pre>
    `
  },
  {
    "question": "Valid Parentheses",
    "description": "Check if the input string has valid parentheses.",
    "hint": "Use a stack to match open and close brackets.",
    "answer": `
      <pre><code class="language-javascript">
function isValid(s) {
  const stack = [];
  const map = {
    ')': '(', 
    '}': '{', 
    ']': '['
  };
  for (let char of s) {
    if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
      </code></pre>
    `
  },
  {
    "question": "Kth Largest Element in an Array",
    "description": "Return the kth largest element.",
    "hint": "Use a min heap of size k.",
    "answer": `
      <pre><code class="language-javascript">
function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}
      </code></pre>
    `
  },
  {
    "question": "Subsets",
    "description": "Return all possible subsets of a set.",
    "hint": "Use backtracking or iterative bit manipulation.",
    "answer": `
      <pre><code class="language-javascript">
function subsets(nums) {
  const res = [[]];
  for (let num of nums) {
    const n = res.length;
    for (let i = 0; i < n; i++) {
      res.push([...res[i], num]);
    }
  }
  return res;
}
      </code></pre>
    `
  },
  {
    "question": "Climbing Stairs",
    "description": "You can climb 1 or 2 steps. How many ways to reach the top?",
    "hint": "Use dynamic programming.",
    "answer": `
      <pre><code class="language-javascript">
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
      </code></pre>
    `
  },
  
  {
    "question": "Describe a situation where you had to work on a project outside your comfort zone.",
    "description": "Assesses adaptability and willingness to take on challenges.",
    "hint": "Highlight learning, collaboration, and how you managed uncertainty.",
    "answer": `
      <p><strong>Sample Answer:</strong></p>
      <p>During my internship, I was assigned a frontend task although I had more backend experience. I took it as an opportunity to learn. I spent extra hours learning React and CSS, consulted with teammates, and successfully delivered the feature within the deadline. It boosted my confidence and broadened my skill set.</p>
    `
  },
  {
    "question": "How do you prioritize tasks when you have multiple deadlines approaching?",
    "description": "Evaluates time management and decision-making.",
    "hint": "Talk about planning, urgency vs importance, and communication.",
    "answer": `
      <p><strong>Sample Answer:</strong></p>
      <p>I use a priority matrix to identify what's urgent and important. I break tasks into smaller chunks and set milestones. If conflicts arise, I proactively communicate with stakeholders to set clear expectations and adjust timelines if needed.</p>
    `
  },
  {
    "question": "Have you ever failed in a team project? What did you learn?",
    "description": "Tests accountability and reflection on failure.",
    "hint": "Be honest, emphasize learning and improvements made.",
    "answer": `
      <p><strong>Sample Answer:</strong></p>
      <p>Yes, during a hackathon our team failed to deliver the demo due to miscommunication. I learned the importance of clear task delegation and daily check-ins. I now ensure everyone’s on the same page before executing collaborative projects.</p>
    `
  },
  {
    "question": "What would you do if you felt your ideas were being ignored in a team?",
    "description": "Reveals communication and interpersonal skills.",
    "hint": "Show professionalism and persistence.",
    "answer": `
      <p><strong>Sample Answer:</strong></p>
      <p>I would first ensure that I communicated my idea clearly. If it was still overlooked, I’d ask for feedback on why it might not be suitable. I’d stay open to team ideas and continue to contribute, knowing collaboration is about collective success.</p>
    `
  },
  {
    "question": "What does innovation mean to you in the context of your work?",
    "description": "Tests your alignment with a company’s value like SAP’s focus on innovation.",
    "hint": "Relate it to practical improvements or creative solutions.",
    "answer": `
      <p><strong>Sample Answer:</strong></p>
      <p>To me, innovation is about finding smarter, more efficient ways to solve problems—whether through automation, code optimization, or new technologies. In one project, I replaced repetitive manual testing with a basic automation script, which saved hours each sprint.</p>
    `
  }



    ];

    fasalQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const title = document.createElement('h3');
        title.textContent = `${index + 1}. ${question.question}`;

        const description = document.createElement('p');
        description.textContent = question.description;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';

        // Hint Button
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Show Hint';
        hintButton.style.padding = '10px 20px';
        hintButton.style.border = 'none';
        hintButton.style.borderRadius = '5px';
        hintButton.style.backgroundColor = '#4CAF50';
        hintButton.style.color = 'white';
        hintButton.style.fontWeight = 'bold';
        hintButton.style.cursor = 'pointer';
        hintButton.style.transition = 'all 0.3s ease';
        hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for hint button
        hintButton.addEventListener('mouseover', () => {
            hintButton.style.backgroundColor = '#45a049';
            hintButton.style.transform = 'translateY(-2px)';
            hintButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('mouseout', () => {
            hintButton.style.backgroundColor = '#4CAF50';
            hintButton.style.transform = 'translateY(0)';
            hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = `<p>${question.hint}</p>`;
            hintModal.style.display = 'block';
        });

        // Answer Button
        const answerButton = document.createElement('button');
        answerButton.textContent = 'Show Answer';
        answerButton.style.padding = '10px 20px';
        answerButton.style.border = 'none';
        answerButton.style.borderRadius = '5px';
        answerButton.style.backgroundColor = '#2196F3';
        answerButton.style.color = 'white';
        answerButton.style.fontWeight = 'bold';
        answerButton.style.cursor = 'pointer';
        answerButton.style.transition = 'all 0.3s ease';
        answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for answer button
        answerButton.addEventListener('mouseover', () => {
            answerButton.style.backgroundColor = '#0b7dda';
            answerButton.style.transform = 'translateY(-2px)';
            answerButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('mouseout', () => {
            answerButton.style.backgroundColor = '#2196F3';
            answerButton.style.transform = 'translateY(0)';
            answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = question.answer;
            hintModal.style.display = 'block';
        });

        // Add buttons to container
        buttonContainer.appendChild(hintButton);
        buttonContainer.appendChild(answerButton);

        questionDiv.appendChild(title);
        questionDiv.appendChild(description);
        questionDiv.appendChild(buttonContainer);
        questionsListDiv.appendChild(questionDiv);
    });

    closeBtn.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});