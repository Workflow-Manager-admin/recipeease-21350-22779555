import React, { useState } from 'react';
import './App.css';

// --- Color scheme from app requirements ---
const COLORS = {
  primary: '#FF7043',       // orange (main accent)
  secondary: '#FFF3E0',     // creamy background
  accent: '#388E3C',        // green (for highlights/icons)
  background: '#FFF',
  text: '#222',
};

const NAV_ITEMS = [
  { label: 'Home', icon: '🏠', tab: 'home' },
  { label: 'Add', icon: '➕', tab: 'add' },
  { label: 'Favorites', icon: '★', tab: 'favorites' },
];

// ------ UI COMPONENT PLACEHOLDERS ------

// PUBLIC_INTERFACE
function SearchBar({ onSearch }) {
  /** Recipe search input and filter bar. */
  const [query, setQuery] = useState('');
  return (
    <form
      style={{
        display: 'flex',
        gap: 8,
        background: COLORS.secondary,
        padding: 12,
        borderRadius: 6,
        marginTop: 16,
        marginBottom: 22,
        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
      }}
      onSubmit={e => {
        e.preventDefault();
        onSearch(query);
      }}
      aria-label="search recipes"
    >
      <input
        aria-label="Search recipes"
        placeholder="Search by name, ingredient, or category"
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          flex: 1,
          fontSize: 16,
          border: 'none',
          outline: 'none',
          padding: '10px 12px',
          borderRadius: 4,
          background: COLORS.background,
          color: COLORS.text,
        }}
      />
      <button
        type="submit"
        style={{
          background: COLORS.primary,
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '0 20px',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
}

// PUBLIC_INTERFACE
function RecipeCard({ recipe, onFavorite, onOpen }) {
  /**
   * Card showing summary (image, title, favorite).
   * Expects a "recipe" object with title, image, isFavorite.
   */
  return (
    <div
      style={{
        borderRadius: 10,
        boxShadow: '0 2px 10px #ddd',
        background: COLORS.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        minWidth: 220,
      }}
      onClick={() => onOpen(recipe)}
      tabIndex={0}
      aria-label={`Details for recipe ${recipe.title}`}
    >
      <div style={{ height: 150, background: COLORS.secondary, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {recipe.image
          ? <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <span style={{ color: COLORS.accent, fontSize: 32 }}>🍲</span>}
      </div>
      <div style={{ padding: 14 }}>
        <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600, color: COLORS.primary }}>{recipe.title}</h3>
      </div>
      <button
        aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          background: recipe.isFavorite ? COLORS.accent : '#eee',
          color: recipe.isFavorite ? '#fff' : COLORS.accent,
          border: 'none',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 19,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 1px 5px #bbb',
          zIndex: 2,
        }}
        onClick={e => { e.stopPropagation(); onFavorite(recipe); }}
      >
        ★
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function RecipeGrid({ recipes, onFavorite, onOpen }) {
  /** Displays a grid/list of recipe cards. */
  if (!recipes.length) {
    return <div style={{ color: '#888', padding: 24, textAlign: 'center' }}>No recipes found.</div>;
  }
  return (
    <div
      style={{
        display: 'grid',
        gridGap: 24,
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        marginTop: 8,
        marginBottom: 60,
      }}
      aria-label="Recipe list"
    >
      {recipes.map(r => (
        <RecipeCard
          key={r.id}
          recipe={r}
          onFavorite={onFavorite}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function BottomNav({ current, onChange }) {
  /** Fixed bottom navigation for app sections. */
  return (
    <nav
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        background: COLORS.background,
        borderTop: `1px solid #eee`,
        display: 'flex',
        height: 60,
        zIndex: 100,
      }}
      aria-label="Bottom navigation"
    >
      {NAV_ITEMS.map(nav => (
        <button
          key={nav.tab}
          tabIndex={0}
          aria-label={nav.label}
          style={{
            flex: 1,
            border: 'none',
            background: 'none',
            color: current === nav.tab ? COLORS.primary : '#888',
            fontWeight: current === nav.tab ? 700 : 500,
            fontSize: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            cursor: 'pointer',
            outline: 'none',
            borderTop: current === nav.tab ? `2.5px solid ${COLORS.primary}` : '2.5px solid transparent',
            transition: 'color .18s',
          }}
          onClick={() => onChange(nav.tab)}
        >
          <span style={{ fontSize: 21, display: 'block', marginBottom: 2 }}>
            {nav.icon}
          </span>
          {nav.label}
        </button>
      ))}
    </nav>
  );
}

// PUBLIC_INTERFACE
function AddRecipePlaceholder() {
  /** Placeholder for add recipe form. */
  return (
    <div style={{ padding: 40, textAlign: 'center', color: COLORS.text }}>
      <div style={{ fontSize: 45, marginBottom: 10 }}>➕</div>
      <h2 style={{ color: COLORS.primary }}>Add a Recipe</h2>
      <div>Form for adding recipes (ingredients, steps, images) will go here.</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function FavoritesPlaceholder({ recipes, onFavorite, onOpen }) {
  /** Placeholder for Favorites list. */
  return (
    <div style={{ paddingTop: 10 }}>
      <h2 style={{ color: COLORS.primary, marginLeft: 8 }}>Favorites</h2>
      <RecipeGrid recipes={recipes} onFavorite={onFavorite} onOpen={onOpen} />
    </div>
  );
}

// PUBLIC_INTERFACE
function RecipeDetailModal({ recipe, onClose }) {
  /** Placeholder modal for recipe details (with ingredients, steps, nutrition). */
  if (!recipe) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        zIndex: 1000,
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.28)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2vw',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: COLORS.background,
          borderRadius: 10,
          minWidth: 320,
          maxWidth: 360,
          boxShadow: '0 8px 32px #4444',
          padding: '32px 24px 26px 24px',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', right: 7, top: 7,
            background: '#eee', border: 'none', borderRadius: '50%',
            width: 24, height: 24, cursor: 'pointer', color: '#888',
          }}
          aria-label="Close"
        >✕</button>
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <div style={{ width: 80, height: 80, margin: 'auto', background: COLORS.secondary, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 12 }}>
            {recipe.image
              ? <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 38, color: COLORS.accent }}>🍲</span>}
          </div>
          <h2 style={{ margin: 0, color: COLORS.primary }}>{recipe.title}</h2>
        </div>
        {/* Ingredients */}
        <div>
          <h4 style={{ marginBottom: 2 }}>Ingredients</h4>
          <ul style={{ marginTop: 0, marginBottom: 18, paddingLeft: 18 }}>
            {(recipe.ingredients || ['Example: 1 cup rice', '2 eggs']).map((item, idx) =>
              <li style={{ color: COLORS.text }} key={idx}>{item}</li>
            )}
          </ul>
        </div>
        {/* Steps */}
        <div>
          <h4 style={{ marginBottom: 2 }}>Steps</h4>
          <ol style={{ marginTop: 0, marginBottom: 18, paddingLeft: 18 }}>
            {(recipe.steps || ['Step-by-step instructions']).map((item, idx) =>
              <li style={{ color: COLORS.text }} key={idx}>{item}</li>
            )}
          </ol>
        </div>
        {/* Nutrition */}
        <div>
          <h4 style={{ marginBottom: 4 }}>Nutrition</h4>
          <div style={{ color: '#666', fontSize: 15 }}>{recipe.nutritionInfo || 'Nutrition info goes here.'}</div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN APP CONTAINER ---
function App() {
  // For demo: local state for current tab, recipes, selected recipe
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQ, setSearchQ] = useState('');
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "Parmesan"],
      steps: ["Boil pasta", "Fry pancetta", "Mix eggs & cheese", "Combine all"],
      nutritionInfo: "Approx. 550 kcal per serving.",
      isFavorite: false,
    },
    {
      id: 2,
      title: "Avocado Toast",
      image: "", // Placeholder no image
      ingredients: ["2 slices bread", "1 ripe avocado", "Salt", "Lemon juice"],
      steps: ["Toast bread", "Mash avocado", "Spread & season"],
      nutritionInfo: "Approx. 250 kcal per serving.",
      isFavorite: true,
    }
  ]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Derived lists
  const favorites = recipes.filter(r => r.isFavorite);
  const filteredRecipes = searchQ
    ? recipes.filter(
        r =>
          r.title.toLowerCase().includes(searchQ.toLowerCase()) ||
          (r.ingredients && r.ingredients.join(' ').toLowerCase().includes(searchQ.toLowerCase()))
      )
    : recipes;

  // Favorite/unfavorite a recipe
  const handleFavorite = recipe => {
    setRecipes(rs =>
      rs.map(r =>
        r.id === recipe.id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  // --- Determine page main content by tab ---
  let mainContent;
  if (currentTab === 'add') {
    mainContent = <AddRecipePlaceholder />;
  } else if (currentTab === 'favorites') {
    mainContent = (
      <FavoritesPlaceholder
        recipes={favorites}
        onFavorite={handleFavorite}
        onOpen={r => setSelectedRecipe(r)}
      />
    );
  } else {
    // Home: search + all recipes
    mainContent = (
      <React.Fragment>
        <SearchBar onSearch={setSearchQ} />
        <RecipeGrid
          recipes={filteredRecipes}
          onFavorite={handleFavorite}
          onOpen={r => setSelectedRecipe(r)}
        />
      </React.Fragment>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: COLORS.secondary,
        color: COLORS.text,
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="app"
    >
      {/* NAVBAR */}
      <nav
        style={{
          background: COLORS.primary,
          color: '#fff',
          padding: '12px 0',
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 90,
          boxShadow: '0 1px 8px #f0e8e0',
        }}
        className="navbar"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="logo" style={{ fontSize: 21, fontWeight: 700, color: '#fff', letterSpacing: '.02em' }}>
            <span className="logo-symbol" style={{ color: COLORS.accent, fontSize: 27, fontWeight: 800, marginRight: 5 }}>🥕</span>
            RecipeEase
          </div>
          {/* Placeholder for extra navbar actions/buttons */}
          <button
            style={{
              background: COLORS.accent,
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '8px 18px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              marginLeft: 18,
            }}
            tabIndex={0}
          >Try Demo</button>
        </div>
      </nav>
      {/* --- MAIN SECTION --- */}
      <main className="container" style={{ flex: 1, paddingBottom: 80 }}>
        {mainContent}
      </main>
      {/* --- DETAIL MODAL --- */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
      {/* --- BOTTOM NAV --- */}
      <BottomNav
        current={currentTab}
        onChange={setCurrentTab}
      />
    </div>
  );
}

export default App;